import React, { memo } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { Button } from '../Button';
import classes from './categoryButton.module.css';

interface Props {
  className?: string;
  selectedCount?: number;
  isOpen?: boolean;
  onClick?: (e: any) => void;
}

const CategoryButton = ({ className, isOpen, selectedCount = 0, onClick }: Props) => (
  <Button
    onClick={onClick}
    type="button"
    aria-label="Close"
    className={`${classes.categoryButtonBase} ${className || ''} ${isOpen ? classes.showCategories : ''} ${
      selectedCount > 0 ? classes.hasCategories : ''
    }`}
  >
    Category Filters
    {selectedCount > 0 && (
      <div className={`d-flex justify-content-center align-items center ${classes.counter}`}>{selectedCount}</div>
    )}
    <div className={`${classes.caretIcon} ${isOpen ? classes.rotateIcon : ''}`}>
      <Icon type="caretdown" />
    </div>
  </Button>
);

CategoryButton.defaultProps = {
  className: undefined,
  selectedCount: undefined,
  isOpen: undefined,
  onClick: undefined,
};

const CategoryButtonMemo = memo(CategoryButton, areEqualShallow);

export { CategoryButtonMemo as CategoryButton };
