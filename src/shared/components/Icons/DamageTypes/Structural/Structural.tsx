import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import Structural from '../../../../Assets/structural.svg';
import Structural32 from '../../../../Assets/structural-32.svg';

// reusing for now....possible asset change in the future

// Custom css
import classes from './structural.module.css';

interface Props {
  className?: string;
  id?: string;
  iconType?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const StructuralSvg = ({ className = '', id, iconType, onClick, onKeyUp }: Props) => {
  switch (iconType) {
    case '32':
      return (
        <Structural32
          id={id}
          className={`${classes.structuralBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
    default:
      return (
        <Structural
          id={id}
          className={`${classes.structuralBase} ${className || ''}`}
          onClick={onClick}
          onKeyUp={onKeyUp}
        />
      );
  }
};

StructuralSvg.defaultProps = {
  className: undefined,
  id: undefined,
  iconType: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const StructuralSvgMemo = memo(StructuralSvg, areEqualShallow);
export { StructuralSvgMemo as StructuralSvg };
