import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress
} from "@polkadot/extension-dapp";
// import { encodeAddress } from "@polkadot/keyring";
import {
  u8aToString,
  u8aToU8a,
  stringToHex,
  compactFromU8a
} from "@polkadot/util";
import { createTypeUnsafe, Bytes } from "@polkadot/types";
import { expandMetadata } from "@polkadot/metadata";

let api;
let provider;
export async function initApi(config) {
  if (api) {
    return {
      api,
      provider
    };
  }
  provider = new WsProvider(config.endpoint);
  api = await ApiPromise.create({
    provider,
    types: config.types
  });
  return {
    api,
    provider
  };
}

export async function getExtension() {
  const extensions = await web3Enable("demo");
  if (extensions.length === 0) throw new Error("no extension");
  return extensions[0];
}

export async function getAccounts() {
  const timeout = new Promise(resolve => {
    setTimeout(resolve, 300);
  });
  await timeout;
  await getExtension();
  return await web3Accounts();
}

export async function initAccount(api, address) {
  const injector = await web3FromAddress(address);
  api.setSigner(injector.signer);
}

export function toIpfsHash(data) {
  return u8aToString(data);
}

export function ipfsHashToHex(data) {
  return stringToHex(data);
}

export function send(api, address, data) {
  return new Promise((resolve, reject) => {
    try {
      const tx = api.tx.datalog.record(data);
      let unsubscribe;
      tx.signAndSend(address, {}, result => {
        if (result.status.isInBlock) {
          unsubscribe();
          resolve({
            block: result.status.asInBlock.toString(),
            tx: tx.hash.toString()
          });
        }
        // if (result.status.isFinalized) {
        //   unsubscribe();
        //   resolve({
        //     block: result.status.asFinalized.toString(),
        //     tx: tx.hash.toString()
        //   });
        // }
      })
        .then(r => {
          unsubscribe = r;
        })
        .catch(error => {
          reject(error);
        });
    } catch (error) {
      reject(error);
    }
  });
}

function parseDataHex(api, value, skip) {
  const input = u8aToU8a(value);
  let cursor = 0 + skip.pos;
  const [offset, length] = compactFromU8a(input);
  let data = input.subarray(offset + cursor);
  const result = [];
  const countChanks = length.toNumber();
  let chank = 1;
  for (chank; chank <= countChanks && data.length > 0; chank++) {
    const timeBytes = data.subarray(0, 8);
    data = data.subarray(8);

    const timeType = createTypeUnsafe(
      api.registry,
      "MomentOf",
      [timeBytes],
      true
    );
    const value = new Bytes(api.registry, data);
    const dataBytes = data.subarray(0, value.encodedLength);
    data = data.subarray(value.encodedLength);

    if (
      !Object.prototype.hasOwnProperty.call(skip, "time") ||
      skip.time === 0 ||
      Number(timeType.toString()) > skip.time
    ) {
      const dataType = createTypeUnsafe(
        api.registry,
        "Vec<u8>",
        [dataBytes],
        true
      );
      result.push([timeType, dataType]);
    }
    cursor += 8 + value.encodedLength;
  }
  return [cursor, result];
}

export async function subscribeDatalog(
  api,
  provider,
  address,
  cb,
  start = { pos: 0, time: Date.now() }
) {
  const metadata = await api.rpc.state.getMetadata();
  const fnMeta = expandMetadata(api.registry, metadata);
  const params = [fnMeta.query.datalog.datalog, address];
  const paramsType = createTypeUnsafe(
    api.registry,
    "StorageKey",
    [params],
    true
  );

  let skip = start;
  const unsubscribeId = await provider.subscribe(
    "state_storage",
    "state_subscribeStorage",
    [[paramsType.toHex()]],
    (_, r) => {
      if (r) {
        const res = parseDataHex(api, r.changes[0][1], skip);
        skip.pos = res[0];
        skip.time = 0;
        if (res[1].length > 0) {
          cb(res[1]);
        }
      }
    }
  );
  return async function() {
    return await provider.unsubscribe(
      "state_storage",
      "state_unsubscribeStorage",
      unsubscribeId
    );
  };
}

export async function init(config = {}) {
  const { api, provider } = await initApi(config);

  const utils = {
    toIpfsHash,
    ipfsHashToHex,
    getAccounts,
    initAccount(...props) {
      return initAccount(api, ...props);
    },
    send(...props) {
      return initAccount(api, props[0]).then(() => send(api, ...props));
    },
    subscribeDatalog(...props) {
      return subscribeDatalog(api, provider, ...props);
    }
  };

  return { api, provider, utils };
}
