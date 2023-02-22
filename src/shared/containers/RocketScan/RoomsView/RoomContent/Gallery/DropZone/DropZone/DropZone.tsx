import React, { memo, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Dropzone } from 'Components/RocketScan';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';

import { showToast } from 'Containers/PhotoErrorToast/actions';
import { createWorkerFactory, useWorker } from '@shopify/react-web-worker';
import { useUser } from 'Context/User';
import { UserModel } from 'Containers/User/Models/UserModel';
import { chunkArray, getPhotosChunkSize, generateUUID } from 'Utils/helpers';
import { photoUploadingRoomAndAlbumSelector } from 'Containers/RocketScan/RoomsView/RoomContent/Gallery/selectors';
import { projectSelector } from 'Containers/RocketScan/selectors';
import { setUploadingAlbums } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { useRoomFunctions } from 'Context/RocketScan';

interface Props {
  roomId: number;
  albumId?: number;
  hasImages: boolean;
  editable: boolean;
}

const DropzoneContainer = ({ roomId, albumId, hasImages, editable }: Props) => {
  const dispatch = useDispatch();
  const createWorker = createWorkerFactory(() => import('../worker'));
  const dropzoneWorker = useWorker(createWorker);
  const photoUploadingRoomAndAlbum = useSelector(photoUploadingRoomAndAlbumSelector, areEqual);
  const project = useSelector(projectSelector, areEqual);

  const { id: userId }: UserModel = useUser();

  const { setShowLoadingSpinner }: any = useRoomFunctions();

  // on files drop or upload
  const onDrop = useCallback(
    async (acceptedFiles: any[], rejectedFiles: any[]) => {
      // show error toast
      if (rejectedFiles.length > 0) {
        dispatch(showToast());
      }

      // set uploading rooms and albums
      dispatch(
        setUploadingAlbums({
          albumId,
          roomId,
        })
      );
      setShowLoadingSpinner(true);

      const uuid = generateUUID();
      const chunkedArr = chunkArray(acceptedFiles, getPhotosChunkSize(acceptedFiles));

      await Promise.all(
        chunkedArr.map(
          async (filesArray) =>
            await dropzoneWorker.handleUpload(userId, roomId, albumId, filesArray, filesArray.length, uuid, project)
        )
      );

      return true;
    },
    [photoUploadingRoomAndAlbum, project]
  );

  // dropzone
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
  });

  return editable && <Dropzone hasImages={hasImages} getRootProps={getRootProps} getInputProps={getInputProps} />;
};

DropzoneContainer.defaultProps = {
  albumId: undefined,
};

const DropzoneContainerMemo = memo(DropzoneContainer, areEqual);

export { DropzoneContainerMemo as Dropzone };
