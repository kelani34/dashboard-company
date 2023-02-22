import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Next from '../../../Assets/carousel-next.svg';
import Prev from '../../../Assets/carousel-prev.svg';

// Custom css
import classes from './carouselController.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const CarouselControllerSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'next':
      return <Next id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />;
    case 'prev':
      return <Prev id={id} className={`${classes.iconBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />;
    default:
      return null;
  }
};

CarouselControllerSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const CarouselControllerSvgMemo = memo(CarouselControllerSvg, areEqualShallow);

export { CarouselControllerSvgMemo as CarouselControllerSvg };
