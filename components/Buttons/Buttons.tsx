import React, { ComponentPropsWithoutRef, ReactNode } from 'react';
import style from './Buttons.module.css';

// NOTE Could be a way to add motion to this combo element. Otherwise gotta bust em up?
// https://www.framer.com/docs/component/#custom-components

interface CommonProps {
  size?: 'small' | 'base' | 'large',
  variant?: 'primary' | 'success' | 'info' | 'warning' | 'active' | 'inactive',
  children: ReactNode
}

type ButtonPropsInterface = ComponentPropsWithoutRef<'button'> & CommonProps & { as: 'button' }
type AnchorPropsInterface = ComponentPropsWithoutRef<'a'> & CommonProps & { as: 'a' }

export function ButtonBase(props: AnchorPropsInterface):JSX.Element;
export function ButtonBase(props: ButtonPropsInterface):JSX.Element;
export function ButtonBase(props: CommonProps & {as: 'a' | 'button'}):JSX.Element {
  const { as, size = 'large', variant = 'primary', children, ...rest } = props;
  const Element = as;
  
  return (
    <Element
      className={`${style[size]} ${style[variant]} ${style.base_button}`}
      {...rest}
    >
      {children}
    </Element>
  );
}