import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import { Button } from '../Button';
import classes from './cancelButton.module.css';

interface Props {
  className?: string;
  children: any;
  onClick: (e: any) => void;
}

const CancelButton = ({ className, children, onClick }: Props) => (
  <Button onClick={onClick} type="button" aria-label="Close" className={`${classes.btnBase} ${className || ''}`}>
    {children}
  </Button>
);

CancelButton.defaultProps = {
  className: undefined,
};

const CancelButtonMemo = memo(CancelButton, areEqualShallow);

export { CancelButtonMemo as CancelButton };
