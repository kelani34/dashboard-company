import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import classes from './categoryTypeButton.module.css';

interface Props {
  id: number;
  name: string;
  isActive?: boolean;
  onButtonClick?: (e: any) => void;
}

const CategoryTypeButton = ({ id, name, isActive, onButtonClick }: Props) => (
  <button
    id={id.toString()}
    className={`d-flex justify-content-center align-items-center ${classes.categoryPillbutton} ${
      isActive ? classes.active : ''
    } `}
    onClick={onButtonClick}
  >
    {name}
  </button>
);

CategoryTypeButton.defaultProps = {
  isActive: undefined,
  onButtonClick: undefined,
};

const CategoryTypeButtonMemo = memo(CategoryTypeButton, areEqual);

export { CategoryTypeButtonMemo as CategoryTypeButton };
