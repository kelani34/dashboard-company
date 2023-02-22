import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import AirScrubber from '../../../Assets/air-scrubber.svg';

// Custom css
import classes from './airScrubber.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const AirScrubberSvg = ({ className = '', id, onClick, onKeyUp }: Props) => (
  <AirScrubber
    id={id}
    className={`${classes.airScrubberBase} ${className || ''}`}
    onClick={onClick}
    onKeyUp={onKeyUp}
  />
);

AirScrubberSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const AirScrubberSvgMemo = memo(AirScrubberSvg, areEqualShallow);
export { AirScrubberSvgMemo as AirScrubberSvg };
