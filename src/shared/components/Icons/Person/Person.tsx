import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Person from '../../../Assets/person.svg';
import PersonPurple from '../../../Assets/person-purple.svg';

// Custom css
import classes from './person.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const PersonSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case 'personpurple':
      return (
        <PersonPurple
          id={id}
          className={`${classes.personBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Person id={id} className={`${classes.personBase} ${className || ''}`} onClick={onClick} onKeyUp={onKeyUp} />
      );
  }
};

PersonSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: 'person',
  onClick: undefined,
  onKeyUp: undefined,
};

const PersonSvgMemo = memo(PersonSvg, areEqualShallow);

export { PersonSvgMemo as PersonSvg };
