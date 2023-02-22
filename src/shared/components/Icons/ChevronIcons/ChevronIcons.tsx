import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Next from '../../../Assets/chevron-next.svg';
import Previous from '../../../Assets/chevron-previous.svg';

// Custom css
import classes from './chevronIcons.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const ChevronIconsSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'next':
      return <Next id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />;
    case 'previous':
      return (
        <Previous id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
    default:
      return null;
  }
};

ChevronIconsSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const ChevronIconsSvgMemo = memo(ChevronIconsSvg, areEqualShallow);
export { ChevronIconsSvgMemo as ChevronIconsSvg };
