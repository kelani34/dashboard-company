import React, { memo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { PhotoFilter } from 'Components/RocketScan';
import { setSelectedPhotoFilter } from 'Containers/RocketScan/actions';
import { albumTypesSelector, selectedPhotoFilterSelector } from 'Containers/RocketScan/selectors';

const PhotoFilterContainer = () => {
  const dispatch = useDispatch();

  const albumTypes = useSelector(albumTypesSelector, areEqual);
  const selectedPhotoFilter = useSelector(selectedPhotoFilterSelector, areEqual);

  const onClick = useCallback((e: any) => {
    const { id } = e.target;
    dispatch(setSelectedPhotoFilter(Number(id)));
  }, []);

  return <PhotoFilter albumTypes={albumTypes} selected={selectedPhotoFilter} onClick={onClick} />;
};

const PhotoFilterContainerMemo = memo(PhotoFilterContainer, areEqual);
export { PhotoFilterContainerMemo as PhotoFilter };
