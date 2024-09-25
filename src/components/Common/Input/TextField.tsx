/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import Label from "./Label";
import { useFormContext, get } from "react-hook-form";

interface InputOptions {
  className: React.ReactNode;
  variant: string;
  leftContent?: React.ReactNode;
  rightContent?: React.ReactNode;
  containerClassName?: string;
  disabled?: boolean;
  label?: string;
}

type WithErrorProps = {
  name: string;
  value?: never;
};

type WithOutErrorProps = {
  name?: never;
  value?: string | number;
};

type InputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  InputOptions;

type ConditionalStateProps =
  | {
      name?: never;
      value?: string | number;
    }
  | {
      name?: string;
      value?: never;
    };

type Ref = HTMLInputElement;

const classes: Record<string, any> = {
  base: "focus:outline-none transition ease-in-out duration-300",
  disabled: "bg-disable opacity-50 cursor-not-allowed",
  variant: {
    primary:
      "h-12 w-[320px] rounded-lg border border-input-border py-[10px] px-[14px] disabled:cursor-not-allowed disabled:opacity-50",
    secondary: `h-12 w-[320px] border border-input-border py-[10px] px-[14px] rounded-l-lg disabled:cursor-not-allowed disabled:opacity-50`,
  },
};

const WithErrorInput = forwardRef<Ref, InputProps & WithErrorProps>(
  (
    {
      children,
      className,
      variant,
      label,
      rightContent,
      required,
      name,
      leftContent,
      containerClassName,
      ...props
    },
    ref
  ) => {
    const {
      register,
      formState: { errors },
    } = useFormContext();
    const error = get(errors, name);
    return (
      <div
        className={twMerge("w-auto h-auto flex flex-col", containerClassName)}
        ref={ref as React.MutableRefObject<HTMLDivElement>}
      >
        {label && <Label className="" value={label} required={required} />}
        <div className="flex">
          {leftContent && (
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-lg border-gray-300  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <div>{leftContent}</div>
            </span>
          )}
          <input
            className={twMerge(`
                    ${classes.base}
                    ${classes.variant[variant]}
                    ${className}
                    ${error && "border border-red-500"}
                    ${rightContent && "rounded-r-none rounded-l-lg"}
                    ${leftContent && "rounded-l-none rounded-r-lg "}
    
                `)}
            {...props}
            {...register(name)}
          ></input>
          {rightContent && (
            <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-r-lg border-gray-300  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
              <div>{rightContent}</div>
            </span>
          )}
        </div>
        <p
          className={twMerge(
            "visible h-2 top-0 ml-1 text-sm text-red-600 dark:text-red-500 transition-opacity duration-300",
            error ? "opacity-100" : "opacity-0"
          )}
        >
          {error && error.message}
        </p>
      </div>
    );
  }
);

const WithOutErrorInput = forwardRef<Ref, InputProps & WithOutErrorProps>(
  (
    {
      children,
      className,
      variant,
      label,
      rightContent,
      leftContent,
      required = false,
      value,
      type,
      disabled = false,
      ...props
    },
    ref
  ) => (
    <div className="w-auto h-auto flex flex-col">
      {label && <Label className="" value={label} />}
      <div className="flex">
        {leftContent && (
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-l-lg border-gray-300  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <div>{leftContent}</div>
          </span>
        )}
        <input
          required={required}
          ref={ref as React.MutableRefObject<HTMLInputElement>}
          disabled={disabled}
          value={value}
          type={type}
          className={twMerge(`
                ${classes.base}
                ${classes.variant[variant]}
                ${disabled && classes.disabled}
                ${className}
                ${rightContent && "rounded-r-none rounded-l-lg"}
                ${leftContent && "rounded-l-none rounded-r-lg "}

            `)}
          {...props}
        ></input>
        {rightContent && (
          <span className="inline-flex items-center px-3 text-sm text-gray-900 bg-gray-200 border rounded-r-lg border-gray-300  dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600">
            <div>{rightContent}</div>
          </span>
        )}
      </div>
    </div>
  )
);

WithOutErrorInput.displayName = "Input";

WithErrorInput.displayName = "Input";

const Input = forwardRef<Ref, InputProps & ConditionalStateProps>(
  ({ name, value, ...props }, ref) => {
    if (name) {
      return (
        <WithErrorInput
          name={name}
          {...props}
          ref={ref as React.RefObject<HTMLInputElement>}
        />
      );
    } else {
      return (
        <WithOutErrorInput
          value={value}
          {...props}
          ref={ref as React.RefObject<HTMLInputElement>}
        />
      );
    }
  }
);

Input.displayName = "Input";
export default Input;
