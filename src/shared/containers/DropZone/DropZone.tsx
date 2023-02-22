import React, { memo, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { awsStore } from 'Utils/awsStore';
import { Dropzone } from 'Components/DropZone';
import { useDropzone } from 'react-dropzone';
import { useDispatch, useSelector } from 'react-redux';
import { handleApiRequest } from 'Utils/handleApiRequest';
import { Api } from 'Utils/api';

import { showToast } from 'Containers/PhotoErrorToast/actions';
import { attachAlbumPhoto, setFileUploadingRoom } from 'Containers/DropZone/actions';

interface Props {
  roomId: number;
  albumId?: number;
  hasImages: boolean;
  setImageList?: (imgPath: object) => void;
}

// This constructs the urls to view in the PhotoViewer
const imageData = (id: number, raw: string | ArrayBuffer, large: string | ArrayBuffer) => ({
  id,
  thumbnailSrcUrl: large,
  srcUrl: raw,
});

const postTransformObject = (projectId: number | string, contentType: string, response: any) =>
  // Create a new object to match the json schema for the back end request
  ({
    uuid: response.uuid,
    s3_key: response.key,
    bucket: response.bucket,
    file_name: `${response.name}${response.extension}`,
    file_extension: response.extension,
    content_type: contentType,
    project_id: projectId,
  });

const projectIdSelector = ({ projects: { selectedProjectId } }) => selectedProjectId;

const DropzoneContainer = ({ roomId, albumId, hasImages, setImageList }: Props) => {
  const projectId = useSelector(projectIdSelector, areEqual);
  const dispatch = useDispatch();

  const onDrop = useCallback(async (acceptedFiles: any[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      dispatch(showToast());
    }

    // this is to show the spinner on specific room and album
    dispatch(setFileUploadingRoom({ roomId, albumId }));
    const numberOfFiles = acceptedFiles.length;

    acceptedFiles.forEach(async (file: any, index: number) => {
      const reader = new FileReader();

      // For future reference
      // reader.onabort = () => {
      //   //send a message to the Error Messages component
      // };

      // For future reference
      // reader.onerror = () => {
      //   //send a message to the Error Messages component
      // };

      reader.onload = async () => {
        // Do whatever you want with the file contents
        const binaryStr = reader.result;
        // setImageList(imageData(null, binaryStr, binaryStr));
        const response = await awsStore(file, binaryStr);

        // Create a new object to match the back end structure
        const transformed = postTransformObject(projectId, file.type, response);
        const apiResponse = await handleApiRequest(dispatch, Api.post(`/rooms/${roomId}/photos`, transformed));

        if (apiResponse?.data) {
          const {
            data: {
              id,
              sizes: { raw, large },
            },
          } = apiResponse;

          // this will attach each photo to a album, and also give the signal to refresh the specific gallery
          dispatch(attachAlbumPhoto(id, albumId, { roomId, albumId, refresh: index === numberOfFiles - 1 }));

          // will be used for story
          if (setImageList) {
            setImageList(imageData(id, raw, large));
          }
        }
      };

      reader.readAsDataURL(file);
    });
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop, accept: 'image/jpeg, image/png' });

  return (
    <>
      <Dropzone hasImages={hasImages} getRootProps={getRootProps} getInputProps={getInputProps} />
    </>
  );
};

DropzoneContainer.defaultProps = {
  albumId: undefined,
  setImageList: undefined,
};

const DropzoneContainerMemo = memo(DropzoneContainer, areEqual);

export { DropzoneContainerMemo as Dropzone };
