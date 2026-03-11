import React from 'react';
export interface CardProps {
  children: React.ReactNode;
  className?: string;
  'data-id'?: string;
}
export const Card = ({
  children,
  className = '',
  'data-id': dataId
}: CardProps) => {
  return (
    <div
      data-id={dataId}
      className={`bg-white border border-border rounded-xl p-8 transition-shadow hover:shadow-lg ${className}`}>

      {children}
    </div>);

};