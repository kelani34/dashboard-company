import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { CategoryRow } from 'Containers/User';
import { DarkPurpleButton, PurpleButton } from 'Components/Button';

import classes from './editPhotoCategories.module.css';

interface Props {
  fetching: boolean;
  showError: boolean;
  categories: any[];
  onCategoryRowClick: (e: any) => void;
  onEditButtonClick: (e: any) => void;
  onSaveButtonClick: (e: any) => void;
}

const EditPhotoCategories = ({
  fetching,
  showError,
  categories,
  onCategoryRowClick,
  onEditButtonClick,
  onSaveButtonClick,
}: Props) => (
  <>
    {showError && <p className={classes.errorMessage}>You need at least one photo category selected.</p>}
    <div className={classes.categories}>
      {categories.map((category: any) => (
        <CategoryRow key={category.id} category={category} onCategoryRowClick={onCategoryRowClick} />
      ))}
    </div>
    <div className={classes.buttons}>
      <DarkPurpleButton onClick={onEditButtonClick} disabled={fetching}>
        Cancel
      </DarkPurpleButton>
      <PurpleButton className={classes.saveButton} onClick={onSaveButtonClick} disabled={fetching}>
        Save
      </PurpleButton>
    </div>
  </>
);

const EditPhotoCategoriesMemo = memo(EditPhotoCategories, areEqual);

export { EditPhotoCategoriesMemo as EditPhotoCategories };
