import { PrismaClient } from "@prisma/client";
import { Transaction } from "./types";

const prisma = new PrismaClient();

export enum FILTERS {
  "ALL" = "ALL",
  "DECLARE" = "DECLARE",
  "DEPLOY" = "DEPLOY",
  "DEPLOY_ACCOUNT" = "DEPLOY_ACCOUNT",
  "INVOKE" = "INVOKE",
  "L1_HANDLER" = "L1_HANDLER",
}

export async function getSingleTransaction(hash: string) {
  const res = await prisma.transactions.findFirst({
    where: {
      hash,
    },
  });

  return res as Transaction;
}

export async function getAllTransactions(pageNumber: number, filter: FILTERS) {
  const limit = 25;
  const startIndex = (pageNumber - 1) * limit;

  if (filter !== FILTERS.ALL) {
    const transactions = await prisma.transactions.findMany({
      where: {
        type: filter,
      },
      skip: startIndex,
      take: limit,
    });
    return transactions;
  }

  const transactions = await prisma.transactions.findMany({
    skip: startIndex,
    take: limit,
  });
  return transactions;
}

export async function addManyTransactions(transactions: Transaction[]) {
  console.log("Trying to write multiple transactions...");
  const res = await prisma.transactions.createMany({
    data: transactions,
  });

  return res.count;
}

export async function addTransactionAndReturn(transaction: Transaction) {
  console.log("Trying to write single transaction...");
  const data = await prisma.transactions.findFirst({
    where: {
      hash: transaction.hash,
    },
  });

  if (!data) {
    const res: Transaction = await prisma.transactions.create({
      data: transaction,
      select: {
        age: true,
        type: true,
        block: true,
        hash: true,
        id: true,
        status: true,
        position: true,
        version: true,
        calldata: true,
        signature: true,
      },
    });

    return res;
  }
  return null;
}
