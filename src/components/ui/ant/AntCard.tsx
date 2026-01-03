import { Card as AntCard, type CardProps as AntCardProps } from 'antd';
import { forwardRef } from 'react';
import { cn } from '@/utils/helpers';

export interface CardProps extends AntCardProps {
  // Props personalizadas adicionales
}

export const Card = forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => {
  return <AntCard ref={ref} className={cn(className)} {...props} />;
});

Card.displayName = 'Card';
