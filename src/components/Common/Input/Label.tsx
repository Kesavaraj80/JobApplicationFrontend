/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { forwardRef } from "react";

interface LabelOptions {
  className: React.ReactNode;
  value: string;
  required?: boolean;
}

type LabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> &
  LabelOptions;

type Ref = HTMLLabelElement;

const Label = forwardRef<Ref, LabelProps>(
  ({ children, className, required, value, ...props }, ref) => (
    <label
      ref={ref}
      className="block mb-2 text-md font-medium text-gray-900 dark:text-gray-400"
      {...props}
    >
      {value}
      {required && <span className="text-red-600 text-md">*</span>}
    </label>
  )
);
Label.displayName = "Input";
export default Label;
