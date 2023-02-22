import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';

import { Album } from 'Components/Public';
import { listRoomPhotosPerAlbum } from 'Containers/Public/PhotoShare/actions';
import { selectedPhotoFilterSelector } from 'Containers/Project/Unit/selector';
import { getPhotosCount } from 'Utils/helpers';
import { Spinner } from 'Components/Spinner';

import classes from './albums.module.css';

interface Props {
  id: number;
  name: any;
  albumId: string;
  roomId: string;
}

const photoFilters = ['allPhotos', 'damageAssessment', 'dailyProgress', 'preExistingDamages'];

const AlbumContainer = ({ id, name, albumId, roomId }: Props) => {
  const dispatch = useDispatch();

  const { uuid } = useParams<{ uuid: string }>();

  const [photos, setPhotos] = useState([]);
  const [internalPhotosCount, setInternalPhotosCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(2);
  const [photosCount, setPhotosCount] = useState(0);
  const [fetching, setFetching] = useState(true);

  const selectedPhotoFilter = useSelector(selectedPhotoFilterSelector, areEqual);

  useEffect(() => {
    let mounted = true;

    if (mounted && photos.length === 0) {
      (async () => {
        const response: any = await dispatch(listRoomPhotosPerAlbum(uuid, roomId, albumId));

        if (response?.data) {
          const { data } = response;
          const { meta } = response;
          const { total } = meta;

          // update state only if the component mounted
          if (mounted) {
            if (data.length !== photos.length) {
              setPhotosCount(total);
              setInternalPhotosCount(data.length);
              setPhotos(data);
            }
            setFetching(false);
          }
        } else {
          setFetching(false);
        }
      })();
    } else {
      setFetching(false);
    }

    return () => {
      mounted = false;
    };
  }, [photos, uuid]);

  const onClickLastThumbnail = useCallback(async () => {
    setPageNumber((prevState: number) => prevState + 1);

    // get remaining photos
    const response: any = await dispatch(listRoomPhotosPerAlbum(uuid, roomId, albumId, pageNumber));

    if (response?.data) {
      const { data } = response;

      // append new photos to existing photos
      setPhotos((photos) => [...photos, ...data]);
    }
  }, [pageNumber, photos, uuid]);

  useEffect(() => {
    setInternalPhotosCount(photos.length);
  }, [photos]);

  return (
    <>
      {fetching && (
        <div className={classes.spinnerBase}>
          <Spinner loading />
        </div>
      )}
      {!fetching && photos.length > 0 && (
        <Album
          name={name}
          photos={photos}
          photosCount={getPhotosCount(photosCount, internalPhotosCount)}
          hide={photoFilters[id] !== selectedPhotoFilter && selectedPhotoFilter !== 'allPhotos'}
          onClickLastThumbnail={onClickLastThumbnail}
        />
      )}
    </>
  );
};

const AlbumContainerMemo = memo(AlbumContainer, areEqual);

export { AlbumContainerMemo as AlbumContainer };
