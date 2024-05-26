import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import IconButton from "@/components/app/common/IconButton";

const OverviewTabTable = ({
  heading,
  children,
}: {
  heading: string;
  children: React.ReactNode;
}) => {
  return (
    <>
      <h1 className="text-2xl py-6">{heading}</h1>
      <Table>
        <TableBody>{children}</TableBody>
      </Table>
    </>
  );
};

OverviewTabTable.LabelCell = ({
  label = "Some Label",
}: {
  label: string;
  tooltipText: string;
}) => {
  return (
    <TableCell className="p-0 flex items-start">
      <div className="flex gap-2 items-center w-64">
        <IconButton>
          <IconButton.Help />
        </IconButton>
        <p className="uppercase text-xs">{label}:</p>
      </div>
    </TableCell>
  );
};

OverviewTabTable.Row = ({
  children,
  label,
  helpText,
}: {
  label: string;
  helpText: string;
  children: React.ReactNode;
}) => {
  return (
    <TableRow className="">
      <OverviewTabTable.LabelCell label={label} tooltipText={helpText} />
      <TableCell className="w-full px-0 py-0.5 border-b border-b-neutral-700">
        {children}
      </TableCell>
    </TableRow>
  );
};

export default OverviewTabTable;
