import { FieldError } from "react-hook-form";
import { InputHTMLAttributes, forwardRef } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: FieldError;
}

export const InputValidate = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className="w-full">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className={`text-gray-700 mt-1 block w-full border rounded-md px-3 py-2 outline-none transition-all ${
            error
              ? "border-red-500 focus:ring-red-200"
              : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
          } ${className}`}
        />

        {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
      </div>
    );
  },
);

InputValidate.displayName = "input";
