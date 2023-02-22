import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './pillBadge.module.css';

interface Props {
  text: string;
  className?: string;
}

const PillBadge = ({ text, className }: Props) => (
  <span className={`badge rounded-pill ${classes.pillBadge} ${className || ''}`}>{text}</span>
);

PillBadge.defaultProps = {
  className: undefined,
};

const PillBadgeMemo = memo(PillBadge, areEqual);
export { PillBadgeMemo as PillBadge };
