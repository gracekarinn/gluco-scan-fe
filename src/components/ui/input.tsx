import * as React from "react";
import { Label } from "./label";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  label?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, label, ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1">
        {label && <Label className="text-P6 font-normal">{label}</Label>}
        <div className="flex items-center relative ">
          <div
            className={`absolute left-2 text-orange-500`}
          >
            {icon}
          </div>
          <input
            type={type}
            className={cn(
              "flex transition-all h-10 w-full rounded-[10px] border border-[#E6E6E6] bg-white px-4 py-2 text-P4 text-[#4D4D4D] hover:border-0 hover:shadow-inputHover  ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8AABF8] disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-[#E6E6E6]",
              className, icon && "pl-10"
            )}
            ref={ref}
            {...props}
          />
        </div>
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
