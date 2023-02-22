import React, { memo } from 'react';
import { areEqualShallow } from 'Utils/equalityChecks';

export interface Props {
  id?: string;
  ariaLabel: string;
  htmlFor?: string;
  className?: string;
  children: any;
}

const Label = ({ id, ariaLabel, htmlFor, className, children }: Props) => (
  // If htmlFor is not passed, use the id
  <label aria-label={ariaLabel} id={id} htmlFor={htmlFor || id} className={`form-label ${className || ''}`}>
    {children}
  </label>
);
Label.defaultProps = {
  id: undefined,
  htmlFor: undefined,
  className: undefined,
};

const LabelMemo = memo(Label, areEqualShallow);

export { LabelMemo as Label };
