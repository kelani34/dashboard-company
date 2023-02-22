import React, { memo, useEffect } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import {
  getPhotoShareFloors,
  getPhotoShareInfo,
  getPhotoShareUnits,
  setShareUuid,
} from 'Containers/Public/PhotoShare/actions';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchingInfoSelector,
  photoShareFloorsSelector,
  photoShareInfoSelector,
  photoShareUnitsSelector,
} from 'Containers/Public/PhotoShare/selectors';

// photo share provider
const PhotoShareProvider = ({ children }: any) => {
  const dispatch = useDispatch();

  const { uuid } = useParams<{ uuid: string }>();

  const { projectUid, shareTime } = useSelector(photoShareInfoSelector, areEqual);
  const units = useSelector(photoShareUnitsSelector, areEqual);
  const floors = useSelector(photoShareFloorsSelector, areEqual);
  const fetching = useSelector(fetchingInfoSelector, areEqual);

  useEffect(() => {
    if (uuid) {
      dispatch(setShareUuid(uuid));

      if (!projectUid && !shareTime) {
        dispatch(getPhotoShareInfo(uuid));
      }
    }
  }, [uuid]);

  useEffect(() => {
    if (!fetching) {
      if (units.length === 0) {
        dispatch(getPhotoShareUnits(uuid));
      }
      if (floors.length === 0) {
        dispatch(getPhotoShareFloors(uuid));
      }
    }
  }, [fetching]);

  return <>{children}</>;
};

const PhotoShareProviderMemo = memo(PhotoShareProvider, areEqual);

export { PhotoShareProviderMemo as PhotoShareProvider };
