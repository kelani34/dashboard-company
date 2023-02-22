import React, { memo, useCallback } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { projectIdSelector } from 'Containers/RocketScan/selectors';
import {
  selectAllModeSelector,
  selectedPhotosSelector,
  selectPhotosModeSelector,
  unSelectedPhotosSelector,
} from 'Containers/RocketScan/Header/ActionsCenter/selectors';

import { Photo } from 'Components/RocketScan';
import { setSelectedPhotoIds, setUnSelectedPhotoIds } from 'Containers/RocketScan/Header/ActionsCenter/actions';
import { addOrRemoveFromArray, checkIfPhotoSelected } from 'Utils/helpers';

interface Props {
  photo: PhotoModal;
  isLastItem: boolean;
  photosCount: number;
  editable: boolean;
  fetching: boolean;
  onClickLastThumbnail: (e: any) => void;
  setRefreshOnDelete: (e: any) => void;
}

const PhotoContainer = ({
  photo,
  fetching,
  editable,
  isLastItem,
  photosCount,
  onClickLastThumbnail,
  setRefreshOnDelete,
}: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const projectId = useSelector(projectIdSelector, areEqual);
  const selectPhotosMode = useSelector(selectPhotosModeSelector, areEqual);
  const selectAllMode = useSelector(selectAllModeSelector, areEqual);
  const selectedPhotos = useSelector(selectedPhotosSelector, areEqual);
  const unSelectedPhotos = useSelector(unSelectedPhotosSelector, areEqual);

  const {
    id,
    sizes: { large },
    notes_count: notesCount,
    is_bookmarked: isBookmarked,
    is_flagged: isFlagged,
  } = photo;

  const onClickThumbnail = useCallback(
    (e) => {
      if (selectPhotosMode && !selectAllMode) {
        dispatch(setSelectedPhotoIds(addOrRemoveFromArray(selectedPhotos, photo)));

        if (isLastItem && photosCount !== 0) {
          onClickLastThumbnail(e);
        }
      } else if (selectAllMode) {
        dispatch(setUnSelectedPhotoIds(addOrRemoveFromArray(unSelectedPhotos, photo)));

        if (isLastItem && photosCount !== 0) {
          onClickLastThumbnail(e);
        }
      } else if (isLastItem && photosCount !== 0) {
        onClickLastThumbnail(e);
      } else if (!fetching) {
        history.push(`/projects/${projectId}/rocketscan/photo-view?photoId=${id}`);
      }
    },
    [projectId, fetching, isLastItem, photosCount, selectPhotosMode, selectedPhotos, selectAllMode, unSelectedPhotos]
  );

  return (
    <Photo
      id={id}
      large={large}
      editable={editable}
      isLastItem={isLastItem}
      photosCount={photosCount}
      notesCount={notesCount}
      isBookmarked={isBookmarked}
      isFlagged={isFlagged}
      isPhotoSelected={checkIfPhotoSelected(photo, selectedPhotos, unSelectedPhotos, selectPhotosMode, selectAllMode)}
      onClickThumbnail={onClickThumbnail}
      setRefreshOnDelete={setRefreshOnDelete}
    />
  );
};

const PhotoContainerMemo = memo(PhotoContainer, areEqual);

export { PhotoContainerMemo as PhotoContainer };
