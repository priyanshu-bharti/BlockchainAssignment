import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const TooltipText = ({
  tooltipText,
  children,
}: {
  tooltipText: string;
  children: React.ReactNode;
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <span className="text-indigo-300">{children}</span>
        </TooltipTrigger>
        <TooltipContent className="bg-white text-black rounded">{tooltipText}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default TooltipText;
