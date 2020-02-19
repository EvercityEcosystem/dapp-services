import axios from "axios";
import getIpfs, { cat as ipfsCat } from "../utils/ipfs";
import rosBag, { getRosbag } from "./rosBag";
import config from "../config";

export const genRosbagIpfs = data => {
  let bag;
  let hash;
  return getRosbag(data)
    .then(r => {
      bag = r;
      return getIpfs();
    })
    .then(ipfs => {
      return ipfs.add(bag);
    })
    .then(r => {
      hash = r[0].hash;
      return axios.get(`${config.GATEWAY}${hash}`);
    })
    .then(() => {
      return hash;
    })
    .catch(e => {
      console.log(e);
    });
};

export const readRosbagIpfs = (hash, cb, topics = {}) => {
  return ipfsCat(hash).then(r => {
    return rosBag(new Blob([r]), cb, topics);
  });
};

export const watchTx = (web3, tx) => {
  const transactionReceiptAsync = (resolve, reject) => {
    web3.eth.getTransactionReceipt(tx, (error, receipt) => {
      if (error) {
        reject(error);
      } else if (
        receipt === null ||
        (receipt.status === "0x1" && receipt.blockNumber === null)
      ) {
        setTimeout(() => transactionReceiptAsync(resolve, reject), 5000);
      } else {
        resolve(receipt);
      }
    });
  };
  if (Array.isArray(tx)) {
    return Promise.all(tx.map(oneTx => watchTx(oneTx)));
  } else if (typeof tx === "string") {
    return new Promise(transactionReceiptAsync);
  }
  throw new Error(`Invalid Type: ${tx}`);
};
