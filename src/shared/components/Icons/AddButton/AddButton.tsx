import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import AddButton from '../../../Assets/add-button-lg.svg';
import AddButtonSmall from '../../../Assets/add-button-sm.svg';

// Custom css
import classes from './addButton.module.css';

interface Props {
  className?: string;
  id?: string;
  svgItem?: number;
}

const AddButtonSvg = ({ className = '', id, svgItem }: Props) => {
  switch (svgItem) {
    case 2:
      return <AddButtonSmall id={id} className={`${classes.addButtonBase} ${className || ''}`} />;

    default:
      return <AddButton id={id} className={`${classes.addButtonBase} ${className || ''}`} />;
  }
};

AddButtonSvg.defaultProps = {
  svgItem: 1,
  className: undefined,
  id: undefined,
};

const AddButtonSvgMemo = memo(AddButtonSvg, areEqualShallow);

export { AddButtonSvgMemo as AddButtonSvg };
