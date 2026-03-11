import React from 'react';
export interface LabelProps {
  children: React.ReactNode;
  className?: string;
  'data-id'?: string;
}
export const Label = ({
  children,
  className = '',
  'data-id': dataId
}: LabelProps) => {
  return (
    <span
      data-id={dataId}
      className={`text-[0.72rem] uppercase tracking-[0.12em] text-gold-dim font-body ${className}`}>

      {children}
    </span>);

};