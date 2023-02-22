import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { OptionToolBar } from 'Containers/OptionToolBar';

import classes from './categoryOfDamageEdit.module.css';

interface Props {
  categories: any[];
  selectedCategory?: any;
  setSelectedCategory: (e: any) => void;
}

const CategoryOfDamageEdit = ({ categories, selectedCategory, setSelectedCategory }: Props) => (
  <div className={classes.container} role="toolbar" aria-label="Toolbar with button groups">
    <OptionToolBar
      idForLabel="classification-options"
      label="Category of Damage"
      optionNames={categories}
      classificationId={selectedCategory}
      setClassificationId={setSelectedCategory}
    />
  </div>
);

CategoryOfDamageEdit.defaultProps = {
  selectedCategory: undefined,
};

const CategoryOfDamageEditMemo = memo(CategoryOfDamageEdit, areEqual);

export { CategoryOfDamageEditMemo as CategoryOfDamageEdit };
