import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';

import classes from './categoryRow.module.css';

interface Props {
  name: string;
  enabled: boolean;
  onCategoryRowClick: (e: any) => void;
}

const CategoryRow = ({ name, enabled, onCategoryRowClick }: Props) => (
  <span
    className={classes.categoryRow}
    role="button"
    onClick={onCategoryRowClick}
    onKeyUp={onCategoryRowClick}
    tabIndex={0}
  >
    <Icon type={enabled ? 'checkbox' : 'square'} className={classes.icon} />
    {name}
  </span>
);

const CategoryRowMemo = memo(CategoryRow, areEqual);

export { CategoryRowMemo as CategoryRow };
