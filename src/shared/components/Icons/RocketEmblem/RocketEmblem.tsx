import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import RocketEmblem from '../../../Assets/logo.svg';
import RocketEmblemTwo from '../../../Assets/logo.svg';
import RocketEmblemThree from '../../../Assets/logo.svg';
import RocketEmblemSmall from '../../../Assets/logo.svg';

// Custom css
import classes from './rocketEmblem.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
}

const RocketEmblemSvg = ({ className = '', id, svgItem }: Props) => {
  switch (svgItem) {
    case 2:
      return <RocketEmblemTwo id={id} className={`${classes.rocketEmblemBase} ${className || ''}`} />;
    case 3:
      return <RocketEmblemThree id={id} className={`${classes.rocketEmblemBase} ${className || ''}`} />;
    case 4:
      return <RocketEmblemSmall id={id} className={`${classes.rocketEmblemBase} ${className || ''}`} />;

    default:
      return <RocketEmblem id={id} className={`${classes.rocketEmblemBase} ${className || ''}`} />;
  }
};

RocketEmblemSvg.defaultProps = {
  svgItem: 1,
  className: undefined,
  id: undefined,
};

const RocketEmblemSvgMemo = memo(RocketEmblemSvg, areEqualShallow);

export { RocketEmblemSvgMemo as RocketEmblemSvg };
