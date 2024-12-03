'use client';

import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
  error?: string;
}

const CustomInput = forwardRef<HTMLInputElement, InputProps>(
  ({ id, label, error, className, type = 'text', disabled, ...props }, ref) => {
    return (
      <div className="relative">
        <input
          ref={ref}
          id={id}
          type={type}
          placeholder=" "
          disabled={disabled}
          aria-invalid={error ? 'true' : 'false'}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`
            block
            rounded-md
            px-6
            pt-6
            pb-1
            w-full
            text-md
            text-white
            bg-neutral-700
            appearance-none
            focus:outline-none
            focus:ring-2
            focus:ring-blue-500
            peer
            disabled:opacity-70
            disabled:cursor-not-allowed
            transition
            duration-150
            ${error ? 'border-2 border-red-500 focus:ring-red-500' : ''}
            ${className || ''}
          `}
          {...props}
        />
        <label
          htmlFor={id}
          className={`
            absolute 
            text-md
            ${error ? 'text-red-500' : 'text-zinc-400'}
            duration-150 
            transform 
            -translate-y-3 
            scale-75 
            top-4 
            z-10 
            origin-[0] 
            left-6
            peer-placeholder-shown:scale-100 
            peer-placeholder-shown:translate-y-0 
            peer-focus:scale-75 
            peer-focus:-translate-y-3
            peer-disabled:opacity-70
          `}
        >
          {label}
        </label>
        {error && (
          <span
            id={`${id}-error`}
            className="mt-1 text-sm text-red-500"
            role="alert"
          >
            {error}
          </span>
        )}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default CustomInput;
