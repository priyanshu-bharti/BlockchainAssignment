import express, { Request, Response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cron from "node-cron";
import cors from "cors";

import { fetchTransactionDetail, fetchTransactions } from "./fetch";
import { configLoader } from "./config";
import {
  FILTERS,
  addManyTransactions,
  addTransactionAndReturn,
  getAllTransactions,
} from "./database";

async function init() {
  const PORT = configLoader.port || 3000;

  const app = express();
  app.use(cors());

  const httpServer = createServer(app);
  const io = new Server(httpServer, {});

  const transactions = await fetchTransactions(10);
  await addManyTransactions(transactions);

  let data;
  let lastTransactionSuccess = false;

  cron.schedule("*/30 * * * * *", async () => {
    const [transaction] = await fetchTransactions(1);

    lastTransactionSuccess = true;
    if (transaction) {
      data = await addTransactionAndReturn(transaction);
    }
  });

  io.on("connection", async (socket) => {
    console.log("Client connected", socket.id);
    const transactions = await getAllTransactions(1, FILTERS.ALL);

    socket.emit("transaction:get", {
      transactions,
    });

    socket.on("transaction:nextRows", async (data) => {
      const res = await getAllTransactions(data.currentPage, data.filter);
      socket.emit("transaction:get", { transactions: res });
    });
    if (lastTransactionSuccess) {
      socket.emit("transactions:new", { transaction: "jkkjk" });
    }

    socket.on("transaction:filter", async (data) => {
      const res = await getAllTransactions(1, data.filter);
      socket.emit("transaction:get", { transactions: res });
    });
  });

  app.get("/transactiondetail/:hash", async (req: Request, res: Response) => {
    const { hash } = req.params;

    const data = await fetchTransactionDetail(hash as string);

    res.status(200).json({ status: 200, response: data });
  });

  httpServer.listen(PORT, () =>
    console.log("Started on http://localhost:3000")
  );
}

init();
