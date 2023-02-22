import React, { memo, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useUser } from 'Context/User';
import { areEqual } from 'Utils/equalityChecks';

import { PhotoDownloadModal } from 'Components/Projects';

import { UserModel } from 'Containers/User/Models/UserModel';

import {
  downloadProjectPhotos,
  setPreparingPhotoDownload,
  setShowPhotoDownloadModal,
} from 'Containers/Projects/actions';

import {
  photoDownloadProjectSelector,
  fetchingPhotoDownloadSelector,
  preparingPhotoDownloadSelector,
} from 'Containers/Projects/selectors';

const PhotoDownloadModalContainer = () => {
  const dispatch = useDispatch();
  const user: UserModel = useUser();

  const [canDownload, setCanDownload] = useState(false);
  const [downloadSize, setDownloadSize] = useState();

  const photoDownloadProject = useSelector(photoDownloadProjectSelector, areEqual);
  const preparingPhotoDownload = useSelector(preparingPhotoDownloadSelector, areEqual);
  const fetching = useSelector(fetchingPhotoDownloadSelector, areEqual);

  const onClickSize = useCallback((e: any) => {
    e.preventDefault();
    const { id } = e.target;
    setDownloadSize(id);
    setCanDownload(true);
  }, []);

  const onClickDownload = useCallback(
    (e: any) => {
      e.preventDefault();
      dispatch(downloadProjectPhotos(photoDownloadProject, downloadSize));
    },
    [photoDownloadProject, downloadSize]
  );

  const onCloseModal = useCallback((e: any) => {
    e.preventDefault();
    dispatch(setShowPhotoDownloadModal(undefined));
    setDownloadSize(undefined);
    setCanDownload(false);
    setTimeout(() => dispatch(setPreparingPhotoDownload(false)), 1000);
  }, []);

  return (
    <PhotoDownloadModal
      isOpen={photoDownloadProject}
      email={user.email}
      selectedSize={downloadSize}
      canDownload={canDownload}
      fetching={fetching}
      success={preparingPhotoDownload}
      onClickSize={onClickSize}
      onClickDownload={onClickDownload}
      onCloseModal={onCloseModal}
    />
  );
};

const PhotoDownloadModalContainerMemo = memo(PhotoDownloadModalContainer, areEqual);
export { PhotoDownloadModalContainerMemo as PhotoDownloadModal };
