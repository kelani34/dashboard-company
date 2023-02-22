import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import Dashboard from '../../../Assets/dashboard.svg';

// Custom css
import classes from './dashboard.module.css';

interface Props {
  className?: string;
  fill: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const DashboardSvg = ({ className = '', fill = '#5B476B', id, onClick, onKeyUp }: Props) => (
  <Dashboard
    id={id}
    className={`${classes.dashboardBase} ${className || ''}`}
    fill={fill}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

DashboardSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const DashboardSvgMemo = memo(DashboardSvg, areEqualShallow);
export { DashboardSvgMemo as DashboardSvg };
