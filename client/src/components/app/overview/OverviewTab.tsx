import { Badge } from "@/components/ui/badge";
import IconButton from "@/components/app/common/IconButton";
import OverviewTabTable from "@/components/app/overview/OverviewTabTable";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import TooltipText from "../common/TooltipText";

import { TransactionDetail } from "@/types/types";
import { formatTime } from "@/utils/formatTime";

interface IOverviewTabprops {
  transaction: TransactionDetail;
}
const OverviewTab = ({ transaction }: IOverviewTabprops) => {
  return (
    <>
      <OverviewTabTable heading="Transaction Details">
        <OverviewTabTable.Row
          label="Block Number"
          helpText={transaction.transactions?.blockNumber?.toString() ?? ""}
        >
          <TooltipText tooltipText="some text">
            {transaction.transactions?.blockNumber?.toString() ?? ""}
          </TooltipText>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Timestamp"
          helpText="Time at which the transaction was processed"
        >
          <p className="">
            {formatTime(
              new Date(transaction.transactions?.timestamp as string)
            )}{" "}
            ({" "}
            {new Date(
              transaction.transactions?.timestamp as string
            ).toLocaleString()}{" "}
            )
          </p>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Actual Fee"
          helpText="Actual fee paid for executing the transaction"
        >
          <p className="flex items-center gap-1">
            {transaction.transactions?.actualFee?.amount?.toString()}
            <TooltipText tooltipText="Ether">ETH</TooltipText>
            <IconButton>
              <IconButton.Copy />
            </IconButton>
            ({transaction.transactions?.actualFee?.usd?.toString() ?? ""}) to:
            <TooltipText tooltipText="some text">
              StarkWare: Sequencer
            </TooltipText>
            <IconButton>
              <IconButton.Copy />
            </IconButton>
          </p>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Gas Consumed"
          helpText="Lorem ipsum text this is amazing."
        >
          <p className="">{transaction.transactions?.gas}</p>
        </OverviewTabTable.Row>
      </OverviewTabTable>

      <OverviewTabTable heading="Developer Info">
        <OverviewTabTable.Row
          label="Unix Timestamp"
          helpText="Lorem ipsum text this is amazing."
        >
          <p className="flex items-center gap-1">
            {transaction.transactions?.timestamp}
            <IconButton>
              <IconButton.Copy />
            </IconButton>
          </p>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Nonce"
          helpText="Lorem ipsum text this is amazing."
        >
          <p className="">
            {transaction.developer?.nonce ? transaction.developer.nonce : "-"}
          </p>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Position"
          helpText="Lorem ipsum text this is amazing."
        >
          <p className="">{transaction.developer?.position}</p>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Version"
          helpText="Lorem ipsum text this is amazing."
        >
          <p className="">{transaction.developer?.version}</p>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Execution Resources"
          helpText="Lorem ipsum text this is amazing."
        >
          <div className="grid gap-1 py-1">
            {transaction.developer?.execution?.steps && (
              <div className="">
                <Badge variant={"INVOKE"}>
                  {transaction.developer?.execution?.steps} Steps
                </Badge>
              </div>
            )}
            <div className="flex gap-2">
              {transaction.developer?.execution?.pedersen && (
                <Badge variant={"pending"}>
                  {transaction.developer.execution.pedersen} Pedersen_builtin
                </Badge>
              )}

              {transaction.developer?.execution?.range_check && (
                <Badge variant={"pending"}>
                  {transaction.developer.execution.range_check}{" "}
                  Range_check-builtin
                </Badge>
              )}
              {transaction.developer?.execution?.ec_op && (
                <Badge variant={"pending"}>
                  {transaction.developer?.execution?.ec_op} EC_OP_Builtin
                </Badge>
              )}
            </div>
          </div>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Calldata"
          helpText="Lorem ipsum text this is amazing."
        >
          <div className="p-6 bg-neutral-800 space-y-3">
            <div className="flex gap-6">
              <div className="">
                <IconButton>
                  <IconButton.Copy />
                </IconButton>
              </div>
              <div className="">
                <ul className="flex w-fit rounded text-base border border-neutral-600 divide-x divide-neutral-600">
                  <li className={"px-4 py-1 " + "bg-neutral-600 text-white"}>
                    Hex
                  </li>
                  <li className="bg-neutral-950 hover:bg-neutral-700 px-4 py-1">
                    Dec
                  </li>
                  <li className="bg-neutral-950 hover:bg-neutral-700 px-4 py-1">
                    Text
                  </li>
                </ul>
              </div>
            </div>

            <div className="">
              <Table className="bg-neutral-900">
                <TableHeader className="border-b border-b-neutral-700 uppercase font-normal text-sm">
                  <TableRow className="border-b border-b-neutral-700">
                    <TableHead className="w-32">Input</TableHead>
                    <TableHead className="">Value</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transaction.developer?.calldata?.map((data) => (
                    <TableRow
                      className="border-b border-b-neutral-700"
                      key={data.input}
                    >
                      <TableCell className="text-orange-300 font-mono py-1">
                        {data.input}
                      </TableCell>
                      <TableCell className="text-emerald-300 font-mono py-1 flex justify-between items-center">
                        "{data.value}"
                        <IconButton>
                          <IconButton.Copy />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </OverviewTabTable.Row>
        <OverviewTabTable.Row
          label="Signature(s)"
          helpText="Lorem ipsum text this is amazing."
        >
          <div className="text-orange-300 [&>p]:py-2">
            {transaction.developer?.signature?.map((signature, idx) => (
              <p
                key={idx + signature}
                className="[&:not(:last-child)]:border-b border-b-neutral-700 flex justify-between items-center"
              >
                {signature}
                <IconButton>
                  <IconButton.Copy />
                </IconButton>
              </p>
            ))}
          </div>
        </OverviewTabTable.Row>
      </OverviewTabTable>
    </>
  );
};

export default OverviewTab;
