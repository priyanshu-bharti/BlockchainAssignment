import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import IconButton from "@/components/app/common/IconButton";

const EventsTabTable = ({ children }: { children: React.ReactNode }) => {
  return (
    <Table>
      <TableHeader className="border-t border-t-neutral-700 uppercase font-normal">
        <TableRow className="border-b border-b-neutral-700">
          <TableHead className="h-min py-2 w-64">ID</TableHead>
          <TableHead className="h-min py-2">Block</TableHead>
          <TableHead className="h-min py-2">Age</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="border-b border-b-neutral-700">
        {children}
      </TableBody>
    </Table>
  );
};

EventsTabTable.Row = ({
  id,
  age,
  block,
}: {
  id: string;
  block: string;
  age: string;
}) => {
  return (
    <TableRow className="border-b border-b-neutral-700">
      <TableCell className="h-min py-1 text-indigo-300">{id}</TableCell>
      <TableCell className="h-min py-1 text-indigo-300">
        <div className="flex items-center gap-2">
          {block}
          <IconButton>
            <IconButton.Copy />
          </IconButton>
        </div>
      </TableCell>
      <TableCell className="h-min py-1">{age}</TableCell>
    </TableRow>
  );
};

export default EventsTabTable;
