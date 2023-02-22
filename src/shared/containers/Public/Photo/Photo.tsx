import React, { memo, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Photo } from 'Components/Public';

import { useHistory, useParams } from 'react-router-dom';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

interface Props {
  photo: PhotoModal;
  isLastItem: boolean;
  photosCount: number;
  onClickLastThumbnail: (e: any) => void;
}

const PhotoContainer = ({ photo, isLastItem, photosCount, onClickLastThumbnail }: Props) => {
  const history = useHistory();

  const { uuid } = useParams<{ uuid: string }>();

  const selectedUnitType = 'unit';

  const {
    id,
    sizes: { large },
  } = photo;

  const onClickThumbnail = useCallback(() => {
    history.push(`/photo-share/${uuid}/gallery?start_from=${id}`);
  }, [selectedUnitType, uuid]);

  return (
    <Photo
      id={id}
      large={large}
      onClickThumbnail={isLastItem && photosCount !== 0 ? onClickLastThumbnail : onClickThumbnail}
      isLastItem={isLastItem}
      photosCount={photosCount}
    />
  );
};

const PhotoContainerMemo = memo(PhotoContainer, areEqual);

export { PhotoContainerMemo as PhotoContainer };
