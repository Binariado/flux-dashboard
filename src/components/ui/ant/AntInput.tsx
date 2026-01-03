import { Input as AntInput, type InputRef } from 'antd';
import { type ComponentPropsWithRef, forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface InputProps extends ComponentPropsWithRef<typeof AntInput> {
  error?: string;
  label?: string;
}

export interface SearchProps extends ComponentPropsWithRef<typeof AntInput.Search> {
  error?: string;
  label?: string;
}

export interface PasswordProps extends ComponentPropsWithRef<typeof AntInput.Password> {
  error?: string;
  label?: string;
}

const InputInternal = forwardRef<InputRef, InputProps>(
  ({ error, label, className, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <AntInput
          ref={ref}
          status={error ? 'error' : undefined}
          className={cn(className)}
          {...props}
        />
        {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
      </div>
    );
  },
);

const InputPassword = forwardRef<InputRef, PasswordProps>(
  ({ error, label, className, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <AntInput.Password
          ref={ref}
          status={error ? 'error' : undefined}
          className={cn(className)}
          {...props}
        />
        {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
      </div>
    );
  },
);

const InputSearch = forwardRef<InputRef, SearchProps>(
  ({ error, label, className, required, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        )}
        <AntInput.Search
          ref={ref}
          status={error ? 'error' : undefined}
          className={cn(className)}
          {...props}
        />
        {error && <span className="text-red-500 text-xs mt-1 block">{error}</span>}
      </div>
    );
  },
);

type InputComponent = typeof InputInternal & {
  Password: typeof InputPassword;
  Search: typeof InputSearch;
};

export const Input = InputInternal as InputComponent;
Input.Password = InputPassword;
Input.Search = InputSearch;

InputInternal.displayName = 'Input';
InputPassword.displayName = 'Input.Password';
InputSearch.displayName = 'Input.Search';
