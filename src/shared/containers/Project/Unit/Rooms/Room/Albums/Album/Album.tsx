import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Album } from 'Components/Project/Unit/Rooms/Room/Albums/Album';
import { useDispatch, useSelector } from 'react-redux';
import { listRoomPhotosPerAlbum } from 'Containers/Project/Unit/Rooms/actions';
import { useLocation } from 'react-router-dom';
import { ALL_LOCATIONS, PHOTO_MANAGEMENT } from 'Utils/constants';
import { selectedPhotoFilterSelector } from 'Containers/Project/Unit/selector';
import { getPhotosCount } from 'Utils/helpers';

interface Props {
  id: number;
  name: any;
  albumId: string;
  roomId: string;
}

const photoFilters = ['allPhotos', 'damageAssessment', 'dailyProgress', 'preExistingDamages'];

const AlbumContainer = ({ id, name, albumId, roomId }: Props) => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { pathname } = location;

  const [photos, setPhotos] = useState([]);
  const [internalPhotosCount, setInternalPhotosCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(2);
  const [photosCount, setPhotosCount] = useState(0);

  const selectedPhotoFilter = useSelector(selectedPhotoFilterSelector, areEqual);

  useEffect(() => {
    let mounted = true;

    if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}`) && mounted && photos.length === 0) {
      // fetchData internally
      // TODO:: to be moved into a redux object
      (async function fetchData() {
        const response: any = await dispatch(listRoomPhotosPerAlbum(roomId, albumId));

        if (response?.data) {
          const { data } = response;
          const { meta } = response;
          const { total } = meta;

          // set photos for add locations screen
          // dispatch(setRoomAlbumPhotos(roomId, albumId, total, data));

          // update state only if the component mounted
          if (mounted) {
            if (data.length !== photos.length) {
              setPhotosCount(total);
              setInternalPhotosCount(data.length);
              setPhotos(data);
            }
          }
        }
      })();
    }

    return () => {
      mounted = false;
    };
  }, [pathname, photos]);

  const onClickLastThumbnail = useCallback(async () => {
    setPageNumber((prevState: number) => prevState + 1);

    // get remaining photos
    const response: any = await dispatch(listRoomPhotosPerAlbum(roomId, albumId, pageNumber));

    if (response?.data) {
      const { data } = response;

      // append new photos to existing photos
      setPhotos((photos) => [...photos, ...data]);
    }
  }, [pageNumber, photos]);

  useEffect(() => {
    setInternalPhotosCount(photos.length);
  }, [photos]);

  return (
    photos.length > 0 && (
      <Album
        name={name}
        photos={photos}
        photosCount={getPhotosCount(photosCount, internalPhotosCount)}
        hide={photoFilters[id] !== selectedPhotoFilter && selectedPhotoFilter !== 'allPhotos'}
        onClickLastThumbnail={onClickLastThumbnail}
      />
    )
  );
};

const AlbumContainerMemo = memo(AlbumContainer, areEqual);

export { AlbumContainerMemo as AlbumContainer };
