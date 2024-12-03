/**
 * AuthInput - A reusable input component for authentication forms
 * 
 * Helpful Resources:
 * - React Forms: https://react.dev/reference/react-dom/components/input
 * - Tailwind CSS: https://tailwindcss.com/docs
 * - ARIA Labels: https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
 */

import { useState, useEffect } from 'react';

// These are the different types of inputs we support
type InputType = 'text' | 'email' | 'password';

// Props are the settings we can pass to this component
interface AuthInputProps {
  label: string;           // Text shown above the input
  name: string;           // HTML name attribute
  type: InputType;        // Type of input (text/email/password)
  value: string;          // Current text in the input
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;          // Function to run when text changes
  error?: string;         // Error message to show (optional)
  isLoading?: boolean;    // If true, disables the input
  isSignUp?: boolean;     // If true, we're on signup page
}

// This helps us pick the right autocomplete setting for browsers
const getAutoComplete = (type: InputType): string => {
  switch (type) {
    case 'email':
      return 'email';
    case 'password':
      return 'current-password';
    default:
      return 'off';
  }
};

export const AuthInput = ({
  label,
  name,
  type,
  value,
  onChange,
  error,
  isLoading = false,
  isSignUp = false,
}: AuthInputProps) => {
  // Track if we should show the password as text
  const [showPassword, setShowPassword] = useState(false);
  
  // Create unique ID for input-label connection
  const inputId = `${name}-input`;
  
  // Show password as text or dots
  const [inputType, setInputType] = useState(type);

  useEffect(() => {
    setInputType(showPassword ? 'text' : type);
  }, [showPassword, type]);

  return (
    <div className="relative">
      {/* Hidden label for screen readers */}
      <label className="sr-only" htmlFor={inputId}>
        {label}
      </label>

      <div className="relative">
        {/* Main input container - keeps everything aligned */}
        <div className="relative">
          {/* The actual input box */}
          <input
            id={inputId}
            type={inputType}
            name={name}
            value={value}
            onChange={onChange}
            // Styling classes:
            // - peer: Helps style label based on input state
            // - pr-12: Extra padding for password eye button
            className={`peer w-full px-4 py-3 bg-gray-800 border-2 border-gray-800 rounded-lg 
              text-white placeholder-transparent focus:border-blue-500 focus:outline-none
              transition-all duration-150 ${type === 'password' ? 'pr-12' : ''}`}
            placeholder={label}
            required
            disabled={isLoading}
            autoComplete={getAutoComplete(type)}
            aria-label={label}
          />

          {/* Floating label that moves up when typing */}
          <label
            htmlFor={inputId}
            // These classes make the label float:
            // - peer-placeholder-shown: Label is big and centered when empty
            // - peer-focus: Label moves up and gets smaller when clicked
            className="absolute left-4 -top-2.5 px-1 text-sm text-white bg-gray-800 border-gray-50
              transition-all duration-150
              peer-placeholder-shown:text-base peer-placeholder-shown:top-3.5 
              peer-placeholder-shown:text-gray-500 peer-focus:-top-2.5 
              peer-focus:text-sm peer-focus:text-blue-500"
          >
            {label}
          </label>

          {/* Show/hide password button */}
          {type === 'password' && (
            <button
              type="button"
              // These classes keep the button centered:
              // - top-1/2 -translate-y-1/2: Moves button to middle
              className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center w-12
                text-gray-400 hover:text-white transition-colors duration-150 z-10"
              onClick={() => setShowPassword(!showPassword)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {/* Eye icon that changes based on show/hide */}
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.773 3.162 10.065 7.498.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              )}
            </button>
          )}
        </div>

        {/* Special error for non-existing email during sign in */}
        {error && name === 'email' && error === 'Email not found' && !isSignUp && (
          <div className="mt-1 space-y-1 animate-fade-in-up">
            <p className="text-sm text-red-500">Email not found. Please create an account.</p>
          </div>
        )}

        {/* All other error messages */}
        {error && (error !== 'Email not found' || name !== 'email' || isSignUp) && (
          <p className="mt-1 text-sm text-red-500 text-left animate-fade-in-up">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};
