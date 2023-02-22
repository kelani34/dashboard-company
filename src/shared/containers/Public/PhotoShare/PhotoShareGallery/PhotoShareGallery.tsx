import React, { memo, useCallback, useEffect } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { useHistory } from 'react-router-dom';

import { PhotoShareGallery } from 'Components/PhotoShare';
import { useSelector } from 'react-redux';
import {
  fetchingInfoSelector,
  photoShareErrorSelector,
  uuidSelector,
  photoShareInfoSelector,
} from 'Containers/Public/PhotoShare/selectors';
import { selectedPhotoSelector } from 'Containers/PhotoViewCarousel/selector';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { Spinner } from 'Components/Spinner';

const PhotoShareGalleryContainer = () => {
  const history = useHistory();

  const { projectUid, projectAddress } = useSelector(photoShareInfoSelector, areEqual);
  const selectedPhoto: PhotoModal = useSelector(selectedPhotoSelector, areEqual);

  const uuid = useSelector(uuidSelector);
  const fetching = useSelector(fetchingInfoSelector, areEqual);
  const error = useSelector(photoShareErrorSelector, areEqual);

  const onClickBack = useCallback(() => {
    history.push(`/photo-share/${uuid}/view`);
  }, [uuid]);

  // if the API return errors, we'll redirect to the main screen to show error messages
  useEffect(() => {
    if (!fetching) {
      if (error) {
        history.push(`/photo-share/${uuid}`);
      }
    }
  }, [fetching, error]);

  return (
    <>
      {fetching && (
        <div className="d-flex w-100 mh-100">
          <Spinner loading />
        </div>
      )}
      {!fetching && !error && (
        <PhotoShareGallery
          onClickBack={onClickBack}
          projectUid={projectUid}
          location={projectAddress}
          selectedPhoto={selectedPhoto}
        />
      )}
    </>
  );
};

const PhotoShareGalleryContainerMemo = memo(PhotoShareGalleryContainer, areEqual);

export { PhotoShareGalleryContainerMemo as PhotoShareGallery };
