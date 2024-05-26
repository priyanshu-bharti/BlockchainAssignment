import IconButton from "./IconButton";

const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return <div className="grid gap-3">{children}</div>;
};

PageHeader.InfoLabel = ({
  label = "Label",
  showHelp,
  children,
}: {
  label?: string;
  children: React.ReactNode;
  showHelp?: boolean;
}) => {
  return (
    <div className="flex flex-col ">
      <div className="flex gap-1 items-center h-9">
        <p className="text-white/70 text-xs uppercase">{label}</p>
        {showHelp && (
          <IconButton>
            <IconButton.Help />
          </IconButton>
        )}
      </div>
      {children}
    </div>
  );
};

PageHeader.InfoFragment = ({
  label,
  children,
  showHelp,
}: {
  label: string;
  children: React.ReactNode;
  showHelp?: boolean;
}) => {
  return (
    <div className="h-16">
      <PageHeader.InfoLabel showHelp={showHelp} label={label}>
        <div className="flex items-center gap-2">{children}</div>
      </PageHeader.InfoLabel>
    </div>
  );
};

export default PageHeader;
