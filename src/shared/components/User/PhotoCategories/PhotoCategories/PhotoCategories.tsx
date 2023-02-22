import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { DarkPurpleButton } from 'Components/Button';

import { EditPhotoCategories } from 'Containers/User';
import { Spinner } from 'Components/Spinner';
import classes from './photoCategories.module.css';

interface Props {
  fetching: boolean;
  editMode: boolean;
  photoCategories: any[];
  onEditButtonClick: (e: any) => void;
}

const PhotoCategories = ({ fetching, editMode, photoCategories, onEditButtonClick }: Props) => (
  <div className={classes.photoCategories}>
    <div className={classes.header}>
      <h2 className={classes.title}>Photo Categories</h2>
      {!editMode && (
        <DarkPurpleButton onClick={onEditButtonClick} type="button">
          Edit
        </DarkPurpleButton>
      )}
    </div>
    <p className={classes.description}>Photo album categories selected will affect all projects in your company.</p>
    {!editMode && (
      <div className={classes.categories}>
        <Spinner loading={fetching} />
        {photoCategories.map(({ id, name, enabled }: any) => enabled && <p key={id}>{name}</p>)}
      </div>
    )}

    {editMode && <EditPhotoCategories photoCategories={photoCategories} onEditButtonClick={onEditButtonClick} />}
  </div>
);

const PhotoCategoriesMemo = memo(PhotoCategories, areEqual);

export { PhotoCategoriesMemo as PhotoCategories };
