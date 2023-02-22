import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import Highrise from '../../../Assets/highrise.svg';
import HighriseSmall from '../../../Assets/highrise-small.svg';

import classes from './highrise.module.css';

interface Props {
  id?: string;
  className?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const HighriseSvg = ({ id, className, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'highrisesmall':
      return (
        <HighriseSmall
          id={id}
          className={`${classes.highriseBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Highrise
          id={id}
          className={`${classes.highriseBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

HighriseSvg.defaultProps = {
  id: undefined,
  className: undefined,
  iconType: 'highrise',
  onClick: undefined,
  onKeyUp: undefined,
};

const HighriseSvgMemo = memo(HighriseSvg, areEqual);

export { HighriseSvgMemo as HighriseSvg };
