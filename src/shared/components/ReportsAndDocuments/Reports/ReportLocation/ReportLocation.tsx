import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './reportLocation.module.css';

interface Props {
  name: string;
  selected: boolean;
  onLocationClick: (e: any) => void;
}

const ReportLocation = ({ name, selected, onLocationClick }: Props) => (
  <div
    className={`d-flex align-items-center ${classes.base}`}
    role="button"
    onClick={onLocationClick}
    onKeyUp={onLocationClick}
    tabIndex={0}
  >
    <Icon type={selected ? 'checkbox' : 'square'} />
    <span className={classes.span}>{name}</span>
  </div>
);

const ReportLocationMemo = memo(ReportLocation, areEqual);

export { ReportLocationMemo as ReportLocation };
