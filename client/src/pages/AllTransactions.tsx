import { io } from "socket.io-client";

import AllTransactionsTable from "@/components/app/transactions/AllTransactionsTable";
import { columns } from "@/components/app/transactions/columns";
import FilterGroup, {
  FILTERS,
} from "@/components/app/transactions/FilterGroup";
import PageHeader from "@/components/app/common/PageHeader";

import Layout from "@/layouts/Layout";

import { useEffect, useState } from "react";
import { Transaction } from "@/types/types";

const socket = io("http://localhost:3000", {
  transports: ["websocket"],
});

const AllTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filter, setFilter] = useState<FILTERS>(FILTERS.ALL);

  useEffect(() => {
    socket.on("transaction:get", ({ transactions }) => {
      setTransactions((prevState) => prevState.concat(transactions));
    });

    socket.on("transaction:new", ({ transaction }) => {
      console.log(transaction);
    });
  }, []);

  useEffect(() => {
    setCurrentPage(1);
    socket.emit("transaction:filter", { filter });
    setTransactions([]);
  }, [filter]);

  return (
    <Layout>
      <PageHeader>
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl">Transactions</h1>
          <p className="text-sm text-white/70">
            A list of transactions on Starknet
          </p>
        </div>
      </PageHeader>

      <FilterGroup>
        <FilterGroup.Item
          setValue={setFilter}
          active={filter === FILTERS.ALL}
          value={FILTERS.ALL}
        />
        <FilterGroup.Item
          setValue={setFilter}
          active={filter === FILTERS.DECLARE}
          value={FILTERS.DECLARE}
        />
        <FilterGroup.Item
          setValue={setFilter}
          active={filter === FILTERS.DEPLOY}
          value={FILTERS.DEPLOY}
        />
        <FilterGroup.Item
          setValue={setFilter}
          active={filter === FILTERS.DEPLOY_ACCOUNT}
          value={FILTERS.DEPLOY_ACCOUNT}
        />
        <FilterGroup.Item
          setValue={setFilter}
          active={filter === FILTERS.INVOKE}
          value={FILTERS.INVOKE}
        />
        <FilterGroup.Item
          setValue={setFilter}
          active={filter === FILTERS.L1_HANDLER}
          value={FILTERS.L1_HANDLER}
        />
      </FilterGroup>
      <AllTransactionsTable
        filter={filter}
        columns={columns}
        data={transactions}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        socket={socket}
      />
    </Layout>
  );
};

export default AllTransactions;
