import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import ReportsCompact from '../../../Assets/reports-type-compact.svg';
import ReportsExpanded from '../../../Assets/reports-type-expanded.svg';
import ReportsLarge from '../../../Assets/reports-type-large.svg';

// Custom css
import classes from './reportsType.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const ReportsTypeSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'expanded':
      return (
        <ReportsExpanded
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    case 'large':
      return (
        <ReportsLarge
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <ReportsCompact
          id={id}
          className={`${classes.iconBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

ReportsTypeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: 'compact',
  onClick: undefined,
  onKeyUp: undefined,
};

const ReportsTypeSvgMemo = memo(ReportsTypeSvg, areEqualShallow);
export { ReportsTypeSvgMemo as ReportsTypeSvg };
