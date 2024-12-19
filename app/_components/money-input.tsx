import { forwardRef } from "react";
import { NumericFormat, NumericFormatProps } from "react-number-format";
import { Input } from "@/app/_components/ui/input";
import { cn } from "@/app/_lib/utils";

interface MoneyInputProps extends Omit<NumericFormatProps, "prefix"> {
  className?: string;
}

export const MoneyInput = forwardRef<HTMLInputElement, MoneyInputProps>(
  ({ className, ...props }, ref) => {
    return (
      <NumericFormat
        customInput={Input}
        prefix="R$ "
        decimalSeparator=","
        thousandSeparator="."
        decimalScale={2}
        fixedDecimalScale
        className={cn("", className)}
        {...props}
      />
    );
  }
);

MoneyInput.displayName = "MoneyInput";
