import React, { memo } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';

export interface Props {
  id?: string;
  className?: string;
  children?: any;
}

const Span = ({ id, className, children }: Props) => (
  <label id={id} htmlFor={id} className={className}>
    {children}
  </label>
);

Span.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
};

const SpanMemo = memo(Span, areEqualShallow);

export { SpanMemo as Span };
