import React, { Component } from 'react';
export interface TitleProps {
  children: React.ReactNode;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  'data-id'?: string;
}
export const Title = ({
  children,
  className = '',
  as: Component = 'h2',
  'data-id': dataId
}: TitleProps) => {
  return (
    <Component
      data-id={dataId}
      className={`font-serif text-ink ${className}`}
      style={{
        fontSize: 'clamp(1.5rem, 3vw, 2rem)'
      }}>

      {children}
    </Component>);

};