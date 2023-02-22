import React, { memo, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Photo } from 'Components/Project/Unit/Rooms/Room/Albums/Album/Photos/Photo/Photo';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setSelectedUnitTypeUrl } from 'Containers/AddLocationTab';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { listCarouselPhotos } from 'Containers/PhotoViewCarousel/actions';
import { selectedMultiUnitSelector } from 'Containers/Project/Unit/selector';
import { projectIdSelector } from 'Containers/Project/selectors';

interface Props {
  photo: PhotoModal;
  isLastItem: boolean;
  photosCount: number;
  onClickLastThumbnail: (e: any) => void;
}

const PhotoContainer = ({ photo, isLastItem, photosCount, onClickLastThumbnail }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const selectedMultiUnit = useSelector(selectedMultiUnitSelector, areEqual);
  const selectedProjectId = useSelector(projectIdSelector, areEqual);

  const {
    id,
    sizes: { large },
  } = photo;

  const onClickThumbnail = useCallback(() => {
    dispatch(setSelectedUnitTypeUrl('allLocations'));
    dispatch(listCarouselPhotos(selectedProjectId, selectedMultiUnit?.type, id.toString()));

    history.push('/photoView');
  }, [selectedMultiUnit, selectedProjectId]);

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
