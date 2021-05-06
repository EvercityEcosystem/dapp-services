// import axios from "axios";
import { tools } from "../utils/ipfs";
import rosBag, { getRosbag } from "./rosBag";
import config from "../config";

export async function genRosbagFile(data) {
  return await getRosbag(data);
}

export async function rosbagToIpfs(rosbag) {
  const hash = (await tools.add(rosbag)).toString();
  console.log(`bag ${config.GATEWAY}${hash}`);
  // await axios.get(`${config.GATEWAY}${hash}`);
  return hash;
}

export async function genRosbagIpfs(data) {
  const bag = await genRosbagFile(data);
  return await rosbagToIpfs(bag);
}

export async function readRosbagIpfs(hash, cb, topics = {}) {
  const r = await tools.cat(hash);
  return rosBag(new Blob([r]), cb, topics);
}

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
