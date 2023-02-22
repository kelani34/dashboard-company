import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import PeoplePink from '../../../../Assets/people-pink.svg';
import PeoplePinkSmall from '../../../../Assets/people-pink-small.svg';
import PeoplePinkMedium from '../../../../Assets/people-pink-medium.svg';

// Custom css
import classes from './peoplePink.module.css';

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
  iconType?: string;
}
const PeoplePinkSvg = ({ className = '', id, onClick, onKeyUp, iconType }: Props) => {
  switch (iconType) {
    case 'peoplepinksmall':
      return (
        <PeoplePinkSmall
          id={id}
          className={`${classes.peoplePinkBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );

    case 'peoplepinkmedium':
      return (
        <PeoplePinkMedium
          id={id}
          className={`${classes.peoplePinkBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );

    default:
      return (
        <PeoplePink
          id={id}
          className={`${classes.peoplePinkBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

PeoplePinkSvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
  iconType: 'people',
};

const PeoplePinkMemo = memo(PeoplePinkSvg, areEqualShallow);
export { PeoplePinkMemo as PeoplePinkSvg };
