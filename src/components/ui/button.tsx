import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-br from-[#982B1C] to-[#800000] text-[#FFF7E6] border border-[rgba(255,178,0,0.35)] rounded-[10px] shadow-[0_8px_24px_rgba(128,0,0,0.25)] hover:brightness-110 hover:shadow-[0_12px_32px_rgba(128,0,0,0.35)]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-[10px]",
        outline: "border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary hover:text-[#FFF7E6] rounded-[10px]",
        secondary: "border-[1.5px] border-primary bg-transparent text-primary hover:bg-primary hover:text-[#FFF7E6] rounded-[10px]",
        ghost: "hover:bg-muted hover:text-foreground rounded-[10px]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-[10px] px-3",
        lg: "h-11 rounded-[10px] px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
