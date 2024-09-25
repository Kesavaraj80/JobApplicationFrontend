import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonOptions {
  className: React.ReactNode;
  variant: string;
  disabled?: boolean;
}
type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> &
  ButtonOptions;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const classes: Record<string, any> = {
  disabled: "opacity-50 cursor-not-allowed",
  variant: {
    primary:
      "bg-btn_primary font-Sans text-lg text-white h-11  w-36 text-center rounded-md",
    secondary:
      "bg-btn_secondary font-Sans text-lg text-white h-11  w-36 text-center rounded-md",
    outlined: "text-btn_primary  rounded-lg text-lg text-center",
    link: "bg-btn_secondary font-Sans text-lg text-blue-500 h-11 w-36 px-6 py-2 rounded-md",
  },
};

type Ref = HTMLButtonElement;
const Button = forwardRef<Ref, ButtonProps>(
  ({ children, className, variant, disabled = false, ...props }, ref) => (
    <button
      ref={ref}
      disabled={disabled}
      type="button"
      className={twMerge(`
                ${classes.variant[variant]}
                ${disabled && classes.disabled}
                ${className}
                
            `)}
      {...props}
    >
      {children}
    </button>
  )
);
Button.displayName = "Button";
export default Button;
