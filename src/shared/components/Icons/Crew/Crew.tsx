import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Crew from '../../../Assets/crew.svg';

// Custom css
import classes from './crew.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const CrewSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <Crew id={id} className={`${classes.crewBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
);

CrewSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CrewSvgMemo = memo(CrewSvg, areEqualShallow);
export { CrewSvgMemo as CrewSvg };
