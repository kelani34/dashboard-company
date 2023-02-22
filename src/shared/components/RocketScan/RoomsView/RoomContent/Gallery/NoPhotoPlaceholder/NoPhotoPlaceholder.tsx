import React, { memo } from 'react';

import { EditButton } from 'Components/Button/EditButton';
import { Icon } from 'Components/Icons';

import { areEqual } from 'Utils/equalityChecks';
import classes from './noPhotoPlaceholder.module.css';

interface Props {
  onClickEditButton: (e: any) => void;
}

const NoPhotoPlaceholder = ({ onClickEditButton }: Props) => (
  <div className={`d-flex flex-column justify-content-evenly align-items-center ${classes.container}`}>
    <Icon type="galleryplaceholder" />
    <div className={classes.text}>No photos yet, add photos</div>
    <EditButton editable={false} onClick={onClickEditButton} />
  </div>
);

const NoPhotoPlaceholderMemo = memo(NoPhotoPlaceholder, areEqual);
export { NoPhotoPlaceholderMemo as NoPhotoPlaceholder };
