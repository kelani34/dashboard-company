import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { Button } from '../Button';
import classes from './clearButton.module.css';

interface Props {
  className?: string;
  onClick: (e: any) => void;
}

const ClearButton = ({ className, onClick }: Props) => (
  <Button onClick={onClick} type="button" aria-label="Close" className={`${classes.btnBase} ${className || ''}`}>
    <Icon type="modalclose" /> Clear
  </Button>
);

ClearButton.defaultProps = {
  className: undefined,
};

const ClearButtonMemo = memo(ClearButton, areEqualShallow);

export { ClearButtonMemo as ClearButton };
