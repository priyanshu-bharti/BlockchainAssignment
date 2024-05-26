/* eslint-disable react-refresh/only-export-components */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground",
        pending:
          "uppercase rounded font-normal bg-orange-300/10 border-orange-300/40 text-orange-300",
        INVOKE:
          "uppercase rounded font-normal bg-emerald-300/10 border-emerald-300/40 text-emerald-300",
        L1_HANDLER:
          "uppercase rounded font-normal bg-gray-300/10 border-gray-300/40 text-gray-300",
        DEPLOY_ACCOUNT:
          "uppercase rounded font-normal bg-blue-300/10 border-blue-300/40 text-blue-300",
        DEPLOY:
          "uppercase rounded font-normal bg-blue-300/10 border-blue-300/40 text-blue-300",
        DECLARE:
          "uppercase rounded font-normal bg-lime-300/10 border-lime-300/40 text-lime-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
