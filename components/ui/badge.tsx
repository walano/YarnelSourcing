import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-[11px] font-medium uppercase",
  {
    variants: {
      variant: {
        sky: "bg-sky/25 text-navy",
        electric: "bg-electric/10 text-electric",
        navy: "bg-navy text-white",
        outline: "border border-white/30 text-white"
      }
    },
    defaultVariants: { variant: "sky" }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}
