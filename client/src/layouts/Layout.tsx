import { Card } from "@/components/ui/card";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen p-6 bg-neutral-950 grid place-items-center">
      <Card className="bg-neutral-900 p-6 flex w-full h-full flex-col gap-6 rounded-md overflow-clip">
        {children}
      </Card>
    </div>
  );
};

export default Layout;
