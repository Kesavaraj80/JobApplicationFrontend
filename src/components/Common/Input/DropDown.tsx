/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEventHandler, forwardRef } from "react";
import { useFormContext } from "react-hook-form";
import Label from "./Label";
import { twMerge } from "tailwind-merge";

interface options {
  label: string;
  value: string;
}
interface InputOptions {
  name: string;
  label?: string;
  className: React.ReactNode;
  disabled?: boolean;
  required?: boolean;
  options: options[];
  defaultValue?: string;
  addDefaultKey?: boolean;
  onChange?: ChangeEventHandler<HTMLSelectElement> | undefined;
}

type SelectProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> &
  InputOptions;

type Ref = HTMLSelectElement;

const classes: Record<string, any> = {
  // base:"block py-2.5 px-0 w-[320px] text-sm text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer",
  base: "focus:ring-blue-500 focus:border-blue-500 focus:outline-none  h-12 w-[320px] rounded-lg border border-input-border py-[10px] px-[14px] disabled:cursor-not-allowed disabled:opacity-50",
  disabled: "bg-disable opacity-50 cursor-not-allowed",
};

const DropDown = forwardRef<Ref, SelectProps>(
  ({
    children,
    className,
    name,
    value,
    options,
    required,
    label,
    disabled = false,
    addDefaultKey = true,
    defaultValue,
    onChange,
    ...props
  }) => {
    const { register } = useFormContext();
    return (
      <div className="w-auto h-auto flex flex-col">
        {label && <Label className="" value={label} required={required} />}
        <select
          {...register(name)}
          disabled={disabled}
          value={value}
          className={twMerge(`
                  ${classes.base}
                  ${disabled && classes.disabled}
                  ${className}
              `)}
          {...props}
          defaultValue={defaultValue}
          onChange={onChange}
        >
          {addDefaultKey && <option>select</option>}
          {options.map((item: options) => {
            return (
              <option value={item.value} key={item.label}>
                {item.label}
              </option>
            );
          })}
        </select>
      </div>
    );
  }
);

const Select = forwardRef<Ref, SelectProps>(
  (
    {
      children,
      className,
      value,
      options,
      name,
      label,
      disabled = false,
      defaultValue,
      ...props
    },
    ref
  ) => (
    <div className="w-auto h-auto flex flex-col">
      {label && <Label className="" value={label} />}
      <select
        name={name}
        ref={ref}
        disabled={disabled}
        value={value}
        className={twMerge(`
                ${classes.base}
                ${disabled && classes.disabled}
                ${className}
            `)}
        {...props}
        defaultValue={defaultValue}
      >
        <option>Select</option>

        {options.map((item: options) => {
          return (
            <option value={item.value} key={item.label}>
              {item.label}
            </option>
          );
        })}
      </select>
    </div>
  )
);

Select.displayName = "Select";

DropDown.displayName = "DropDown";
export { DropDown, Select };
