import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import { Button } from '../Button';
import classes from './outlineButton.module.css';

interface Props {
  className?: string;
  children: any;
  onClick: (e: any) => void;
}

const OutlineButton = ({ className, children, onClick }: Props) => (
  <Button onClick={onClick} type="button" aria-label="Close" className={`${classes.btnBase} ${className || ''}`}>
    {children}
  </Button>
);

OutlineButton.defaultProps = {
  className: undefined,
};

const OutlineButtonMemo = memo(OutlineButton, areEqualShallow);

export { OutlineButtonMemo as OutlineButton };
