import React, { memo, useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { areEqual, areEqualShallow } from 'Utils/equalityChecks';

import { PhotoView } from 'Components/RocketScan';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { formatDate } from 'Utils/helpers';

import { rocketScanRoutePathSelector, selectedPhotoSelector } from 'Containers/RocketScan/PhotoView/Carousel/selectors';
import { projectIdSelector } from 'Containers/RocketScan/selectors';

const PhotoViewContainer = () => {
  const history = useHistory();

  const [photoUploadedDate, setPhotoUploadedDate] = useState('');
  const [photoUploadedBy, setPhotoUploadedBy] = useState('');

  const projectId = useSelector(projectIdSelector);
  const rocketScanRoutePath = useSelector(rocketScanRoutePathSelector, areEqualShallow);
  const selectedPhoto: PhotoModal = useSelector(selectedPhotoSelector, areEqual);

  //
  useEffect(() => {
    if (selectedPhoto?.id) {
      const {
        created_at: dateCreated,
        creator: { full_name: fullName },
      } = selectedPhoto;
      const formattedDate = formatDate(dateCreated, 'h:mmaaa - MMM d, yyyy');

      setPhotoUploadedDate(formattedDate);
      setPhotoUploadedBy(fullName);
    }
  }, [selectedPhoto]);

  const onClickBack = useCallback(() => {
    // This will return the user to either the SingleUnit or MultiUnit View
    if (rocketScanRoutePath) {
      history.push(rocketScanRoutePath);
    } else {
      history.push(`/projects/${projectId}/rocketscan`);
    }
  }, [rocketScanRoutePath, projectId]);

  return (
    <PhotoView
      selectedPhoto={selectedPhoto}
      photoUploadedDate={photoUploadedDate}
      photoUploadedBy={photoUploadedBy}
      onClickBack={onClickBack}
    />
  );
};

const PhotoViewContainerMemo = memo(PhotoViewContainer, areEqual);

export { PhotoViewContainerMemo as PhotoViewContainer };
