import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { CategoryOfDamageEdit, DateOfLossEdit, CauseOfDamageEdit } from 'Containers/ProjectData';
import { CancelButton, PurpleButton } from 'Components/Button';

import classes from './damageInfoEdit.module.css';

interface Props {
  showCategorySection: boolean;
  onEditButtonClick: (e: any) => void;
  onSaveButtonClick: (e: any) => void;
}

const DamageInfoEdit = ({ showCategorySection, onEditButtonClick, onSaveButtonClick }: Props) => (
  <div className={classes.container}>
    <CauseOfDamageEdit />
    {showCategorySection && <CategoryOfDamageEdit />}
    <DateOfLossEdit />
    <div className={`d-flex justify-content-end align-items-center ${classes.formButtons}`}>
      <CancelButton className={classes.formFooterButton} onClick={onEditButtonClick}>
        Cancel
      </CancelButton>
      <PurpleButton type="submit" className={`${classes.formFooterButton}`} onClick={onSaveButtonClick}>
        Save
      </PurpleButton>
    </div>
  </div>
);

const DamageInfoEditMemo = memo(DamageInfoEdit, areEqual);

export { DamageInfoEditMemo as DamageInfoEdit };
