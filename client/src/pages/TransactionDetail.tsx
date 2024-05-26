import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import IconButton from "@/components/app/common/IconButton";
import PageHeader from "@/components/app/common/PageHeader";
import StatusChip from "@/components/app/overview/StatusChip";
import { Badge } from "@/components/ui/badge";
import Layout from "@/layouts/Layout";
import EventsTab from "@/components/app/events/EventsTab";
import OverviewTab from "@/components/app/overview/OverviewTab";
import { ArrowLeftIcon } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { TransactionDetail as ITransactionDetail } from "@/types/types";

const TransactionDetail = () => {
  const { hash } = useParams();
  const [transaction, setTransaction] = useState<ITransactionDetail>();
  useEffect(() => {
    axios
      .get(`http://localhost:3000/transactiondetail/${hash}`)
      .then((response) => {
        console.log("response from the site is ", response);
        const transactionDetail: ITransactionDetail = response.data.response;
        setTransaction(transactionDetail);
      });
  }, [hash]);

  return (
    <Layout>
      <PageHeader>
        <div className="pb-3 flex items-center gap-3">
          <Link to="/">
            <ArrowLeftIcon />
          </Link>
          <h1 className="text-2xl">Transaction</h1>
        </div>

        <PageHeader.InfoFragment label="Hash">
          <p className="">{hash}</p>
          <IconButton>
            <IconButton.Copy />
          </IconButton>
        </PageHeader.InfoFragment>

        <div className="flex gap-44 items-center">
          <PageHeader.InfoFragment label="Type" showHelp>
            <Badge variant={"INVOKE"}>{transaction?.type}</Badge>
          </PageHeader.InfoFragment>

          <PageHeader.InfoFragment label="Timestamp">
            <div className="flex items-center gap-2">
              <p className="">May 24 2024</p>
              <p className="text-xs">01:04:29</p>
            </div>
          </PageHeader.InfoFragment>
        </div>

        <PageHeader.InfoFragment label="Status">
          <div className="flex items-center">
            <StatusChip label="Received" />
            <StatusChip.Separator />
            <StatusChip label="Accepted on L2" />
            <StatusChip.Separator success={false} />
            <StatusChip.Loading />
          </div>
        </PageHeader.InfoFragment>
      </PageHeader>

      <Tabs defaultValue="overview" className="pt-6 bg-transparent">
        <TabsList className="bg-transparent">
          <TabsTrigger value="overview" className="px-2">Overview</TabsTrigger>
          <TabsTrigger value="events" className="flex gap-1 px-2">
            Events
            <p className="px-2 py-1 bg-black text-white/50">{transaction?.events.length}</p>
          </TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          {transaction && <OverviewTab transaction={transaction} />}
        </TabsContent>
        <TabsContent value="events">
          {transaction && <EventsTab transaction={transaction} />}
        </TabsContent>
      </Tabs>
    </Layout>
  );
};

export default TransactionDetail;
