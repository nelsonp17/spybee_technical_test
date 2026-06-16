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
        <label className="block text-sm font-medium text-white/90 mb-1">
          {label}
        </label>

        <input
          ref={ref}
          {...props}
          className={`w-full bg-white/5 border text-white placeholder-white/40 rounded-xl px-4 py-3 outline-none transition-all duration-300 backdrop-blur-sm ${
            error
              ? "border-red-500 focus:ring-2 focus:ring-red-500/30"
              : "border-white/20 focus:border-purple-400 focus:ring-2 focus:ring-purple-400/30 hover:bg-white/10"
          } ${className}`}
        />

        {error && <p className="text-red-400 text-xs mt-1.5 ml-1">{error.message}</p>}
      </div>
    );
  },
);

InputValidate.displayName = "input";
