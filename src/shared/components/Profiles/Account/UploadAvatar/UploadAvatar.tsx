import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { DarkPurpleButton } from 'Components/Button';
import { Spinner } from 'Components/Spinner';

import classes from './uploadAvatar.module.css';

interface Props {
  profile: string;
  selectedFileName: string;
  hiddenFileInput: any;
  fileSelectError: string;
  fetching: boolean;
  onClickUpload: (e: any) => void;
  onUploadChange: (e: any) => void;
}

const UploadAvatar = ({
  profile,
  selectedFileName,
  hiddenFileInput,
  fileSelectError,
  fetching,
  onClickUpload,
  onUploadChange,
}: Props) => (
  <div className={classes.container}>
    <div className={classes.avatarUpload}>
      <DarkPurpleButton className={classes.avatarUploadButton} onClick={onClickUpload}>
        {profile === 'user' ? 'Upload Avatar...' : 'Upload Logo...'}
      </DarkPurpleButton>
      <input
        className={classes.upload}
        ref={hiddenFileInput}
        onChange={onUploadChange}
        type="file"
        accept="image/png, image/jpeg"
      />

      {fetching ? (
        <div className={classes.loading}>
          <div className={classes.fileNameBox}>
            <span className={classes.fileName}>File is uploading...</span>
          </div>
          <div className={classes.spinnerBox}>
            <span className={classes.spinner}>
              <Spinner loading />
            </span>
          </div>
        </div>
      ) : (
        <div className={classes.fileNameBox}>
          {selectedFileName ? (
            <span className={classes.fileName}>{selectedFileName}</span>
          ) : (
            <span className={classes.fileName}>No file chosen</span>
          )}
        </div>
      )}
    </div>
    <p className={classes.description}>The maximum file image resolution is 4000x4000px.</p>
    <p className={classes.fileError}>{fileSelectError}</p>
  </div>
);

const UploadAvatarMemo = memo(UploadAvatar, areEqual);

export { UploadAvatarMemo as UploadAvatar };
