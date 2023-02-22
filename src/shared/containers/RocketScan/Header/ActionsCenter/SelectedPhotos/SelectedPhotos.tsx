import React, { memo, useLayoutEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { SelectedPhoto } from 'Containers/RocketScan';
import { useSelector } from 'react-redux';
import {
  photosCountSelector,
  selectedPhotosSelector,
  unSelectedPhotosSelector,
} from 'Containers/RocketScan/Header/ActionsCenter/selectors';

const photoExits = (unSelectedPhotos, photo) => unSelectedPhotos?.some(({ id: photoId }: any) => photo.id === photoId);

const SelectedPhotosContainer = () => {
  const [photos, setPhotos] = useState([]);

  const selectedPhotos = useSelector(selectedPhotosSelector, areEqual);
  const unSelectedPhotos = useSelector(unSelectedPhotosSelector, areEqual);
  const photosCount = useSelector(photosCountSelector, areEqual);

  useLayoutEffect(() => {
    if (selectedPhotos.length > 0) {
      const filtered = selectedPhotos.filter((photo: any) => !photoExits(unSelectedPhotos, photo));
      setPhotos(filtered.slice(0, 8));
    } else {
      setPhotos([]);
    }
  }, [selectedPhotos, unSelectedPhotos]);

  return (
    <>
      {photos.length > 0 &&
        photos.map((photo: any) => <SelectedPhoto key={photo.id} photosCount={photosCount - 8} photo={photo} />)}
    </>
  );
};

const SelectedPhotosContainerMemo = memo(SelectedPhotosContainer, areEqual);

export { SelectedPhotosContainerMemo as SelectedPhotosContainer };
