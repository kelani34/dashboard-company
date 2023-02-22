import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { SelectedPhoto } from 'Components/RocketScan';

import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

interface Props {
  photo: PhotoModal;
  photosCount: number;
}

const SelectedPhotoContainer = ({ photo, photosCount }: Props) => {
  const {
    id,
    sizes: { large },
  } = photo;

  return <SelectedPhoto id={id} large={large} isLastItem={photosCount > 8} photosCount={photosCount} />;
};

const SelectedPhotoContainerMemo = memo(SelectedPhotoContainer, areEqual);

export { SelectedPhotoContainerMemo as SelectedPhotoContainer };
