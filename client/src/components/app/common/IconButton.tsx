import { CopyIcon, HelpCircleIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const IconButton = ({
  children,
  clipboardValue,
}: {
  children: React.ReactNode;
  clipboardValue?: string | number;
}) => {
  const { toast } = useToast();

  const handleCopyToClipboard = (value: string | number = "") => {
    navigator.clipboard.writeText(value as string);
    toast({
      title: "Copied to clipboard",
    });
  };
  return (
    <Button
      className="bg-transparent p-0 hover:bg-transparent grid place-items-center"
      size={"sm"}
      onClick={() => handleCopyToClipboard(clipboardValue)}
    >
      {children}
    </Button>
  );
};

IconButton.Copy = () => {
  return <CopyIcon height={16} className="text-white/50 hover:text-white/75" />;
};

IconButton.Help = () => {
  return <HelpCircleIcon height={18} className="text-white" />;
};

export default IconButton;
