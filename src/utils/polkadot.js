import { ApiPromise, WsProvider } from "@polkadot/api";
import {
  web3Accounts,
  web3Enable,
  web3FromAddress
} from "@polkadot/extension-dapp";
import { u8aToString, stringToHex } from "@polkadot/util";

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
      console.log(props);
      return;
      // return subscribeDatalog(api, provider, ...props);
    }
  };

  return { api, provider, utils };
}
