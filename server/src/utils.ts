import { v4 as uuid } from "uuid";
import { BlockResult, Transaction } from "./types";

export function transformData(results: BlockResult[]): Transaction[] {
  return results.flatMap((result) =>
    result.result.transactions.map((transaction, index) => ({
      id: uuid(),
      status: result.result.status,
      hash: transaction.transaction_hash,
      type: transaction.type,
      block: result.result.block_number,
      age: new Date(result.result.timestamp * 1000).toISOString(),
      position: index,
      version: parseInt(transaction.version.toString(), 16),
      calldata: transaction.calldata,
      signature: transaction.signature,
    }))
  );
}
