import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import SingleHome from '../../../Assets/single-home.svg';
import SingleHomeSmall from '../../../Assets/single-home-sm.svg';

// Custom css
import classes from './singleHome.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const SingleHomeSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'small':
      return (
        <SingleHomeSmall
          id={id}
          className={`${classes.singleHomeBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <SingleHome
          id={id}
          className={`${classes.singleHomeBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

SingleHomeSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const SingleHomeSvgMemo = memo(SingleHomeSvg, areEqualShallow);
export { SingleHomeSvgMemo as SingleHomeSvg };
