import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';

import People from '../../../Assets/people.svg';

// Custom css
import classes from './people.module.css';

interface Props {
  className?: string;
  fill: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const PeopleSvg = ({ className = '', fill = '#5B476B', id, onClick, onKeyUp }: Props) => (
  <People
    id={id}
    className={`${classes.peopleBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
    fill={fill}
  />
);

PeopleSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const PeopleSvgMemo = memo(PeopleSvg, areEqualShallow);
export { PeopleSvgMemo as PeopleSvg };
