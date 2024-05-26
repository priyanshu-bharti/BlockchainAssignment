import axios from "axios";
import {
  BlockResult,
  Transaction,
  TransactionDetail,
  TransactionResult,
} from "./types";
import { transformData } from "./utils";
import { configLoader } from "./config";
import { PrismaClient } from "@prisma/client/extension";
import { getSingleTransaction } from "./database";

export async function fetchAllTransactions(
  startingBlock: number,
  count: number
) {
  console.log(`Making requests for ${count} transaction(s)...`);

  const responses = [];

  const headers = {
    "Content-Type": "application/json",
  };

  for (let i = 0; i < count; i++) {
    const body = JSON.stringify({
      jsonrpc: "2.0",
      method: "starknet_getBlockWithTxs",
      params: [
        {
          block_number: startingBlock - i,
        },
      ],
      id: 1,
    });

    const options = {
      url: configLoader.basename,
      method: "POST",
      headers: headers,
      data: body,
    };
    const response = await axios.request(options);
    responses.push(response.data);
  }

  return responses as BlockResult[];
}

export async function fetchTransactionDetail(hash: string) {
  let headersList = {
    "Content-Type": "application/json",
  };

  const body = JSON.stringify({
    jsonrpc: "2.0",
    method: "starknet_getTransactionReceipt",
    params: [hash],
    id: 1,
  });

  const request = {
    url: configLoader.basename,
    method: "POST",
    headers: headersList,
    data: body,
  };

  const apiResponse: TransactionResult = await axios.request(request);

  const dbResponse: Transaction = await getSingleTransaction(hash);

  const finalObject: TransactionDetail = {
    hash: dbResponse.hash,
    type: dbResponse.type,
    transactions: {
      blockNumber: dbResponse.block,
      timestamp: dbResponse.age,
      actualFee: apiResponse.data.result.actual_fee,
      gas: apiResponse.data.result.gasConsumed,
    },
    developer: {
      timestamp: apiResponse.data.result.unixTimestamp,
      nonce: apiResponse.data.result.nonce,
      position: dbResponse.position,
      version: dbResponse.version,
      execution: {
        steps: apiResponse.data.result.execution_resources.steps,
        pedersen:
          apiResponse.data.result.execution_resources
            .pedersen_builtin_applications,
        ec_op:
          apiResponse.data.result.execution_resources
            .ec_op_builtin_applications,
        range_check:
          apiResponse.data.result.execution_resources
            .range_check_builtin_applications,
      },
      calldata: dbResponse.calldata.map((val, idx) => ({
        value: val,
        input: idx,
      })),
      signature: dbResponse.signature,
    },
    events: apiResponse.data.result.events,
  };
  return finalObject;
}

export async function fetchLatestBlock() {
  let headersList = {
    "Content-Type": "application/json",
  };

  let bodyContent = JSON.stringify({
    jsonrpc: "2.0",
    method: "starknet_blockNumber",
    params: [],
    id: 1,
  });

  let reqOptions = {
    url: configLoader.basename,
    method: "POST",
    headers: headersList,
    data: bodyContent,
  };

  let response = await axios.request(reqOptions);
  return response.data.result;
}

export async function fetchTransactions(count: number) {
  const latestBlock = await fetchLatestBlock();
  const transactions = await fetchAllTransactions(latestBlock, count);
  return transformData(transactions);
}
