import { Button as AntButton, type ButtonProps as AntButtonProps } from 'antd';
import { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface ButtonProps extends AntButtonProps {
  fullWidth?: boolean;
  danger?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ fullWidth, className, danger, ...props }, ref) => {
    return (
      <AntButton ref={ref} danger={danger} block={fullWidth} className={cn(className)} {...props} />
    );
  },
);

Button.displayName = 'Button';
