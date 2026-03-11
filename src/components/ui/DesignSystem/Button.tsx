import React from 'react';
export interface ButtonProps extends
  React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  'data-id'?: string;
}
export const Button = ({
  children,
  className = '',
  'data-id': dataId,
  ...props
}: ButtonProps) => {
  return (
    <button
      data-id={dataId}
      className={`bg-ink text-cream px-6 py-3 rounded-lg font-body transition-colors hover:bg-gold-dim ${className}`}
      {...props}>

      {children}
    </button>);

};