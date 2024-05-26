import { CheckIcon } from "lucide-react";
import Spinner from "@/components/app/overview/Spinner";

const StatusChip = ({ label }: { label: string }) => {
  return (
    <div className="flex gap-1 text-xs items-center px-2 py-1.5 pr-4 bg-green-700 rounded-full hover:px-2.5 hover:pr-5">
      <CheckIcon height={14} />
      {label}
    </div>
  );
};

StatusChip.Separator = ({ success = true }: { success?: boolean }) => {
  return (
    <div
      className={"w-6 h-0.5 " + (success ? "bg-green-700" : "bg-neutral-700")}
    ></div>
  );
};

StatusChip.Loading = () => {
  return (
    <div className="flex gap-1 text-xs items-center bg-neutral-800 border border-neutral-700 rounded-full group">
      <div className="">
        <Spinner />
      </div>
      <p className="hidden group-hover:inline-block pr-3 text-neutral-400">
        Accepted on L1
      </p>
    </div>
  );
};

export default StatusChip;
