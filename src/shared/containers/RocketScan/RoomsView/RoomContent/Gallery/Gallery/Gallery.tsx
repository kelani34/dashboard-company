import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';
import { Gallery } from 'Components/RocketScan';

import { listRoomPhotosPerAlbum } from 'Containers/RocketScan/RoomsView/RoomContent/Gallery/actions';
import { refreshDataForPhotoSelection, setPhotosDeleted } from 'Containers/RocketScan/Header/ActionsCenter/actions';

import { getPhotosCount } from 'Utils/helpers';
import { useOnScreen } from 'Hooks/useOnScreen';
import { locationSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { listLocationRoomsForPhotoSelect } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { uploadingAlbumsSelector } from 'Containers/RocketScan/RoomsView/Rooms/selectors';
import { pusherSelector } from 'Containers/Core/selectors';

const setAlbumAndPhotos = (albums, photosCount, albumId) => {
  const items = [];

  if (albums.length > 0) {
    albums.forEach(({ id, photos }: any) => {
      if (id === albumId) {
        items.push({
          id,
          photos: photosCount,
        });
      } else {
        items.push({
          id,
          photos,
        });
      }
    });
  }

  return items;
};

interface Props {
  title: string;
  roomId: number;
  albumId: number;
  hide?: boolean;
  editable: boolean;
  setAlbumPhotos: (e: any) => void;
}

const GalleryContainer = ({ title, roomId, albumId, hide, editable, setAlbumPhotos }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const mounted = useRef(true);

  const isOnScreen = useOnScreen(ref);

  // show spinner locally when api is being called
  const [fetching, setFetching] = useState(true);
  const [refreshOnDelete, setRefreshOnDelete] = useState(false);
  // this will make sure the photos API will be called once, not every time user scrolls up down
  const [initialLoad, setInitialLoad] = useState(true);

  // selectors
  const location = useSelector(locationSelector, areEqual);
  const pusher = useSelector(pusherSelector, areEqual);
  const uploadingAlbums = useSelector(uploadingAlbumsSelector, areEqual);

  // local variables
  const [photos, setPhotos] = useState<object[]>([]);
  const [internalPhotosCount, setInternalPhotosCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(2);
  const [photosCount, setPhotosCount] = useState(0);

  // fetchData internally per album as user scrolls down
  const getPhotos = useCallback(async () => {
    // enable the local spinner
    setFetching(true);

    const response: any = await dispatch(listRoomPhotosPerAlbum(roomId, albumId));

    if (response?.data) {
      const { data } = response;
      const { meta } = response;
      const { total } = meta;

      // update state only if the component mounted
      if (data.length > 0) {
        setPhotosCount(total);
        setInternalPhotosCount(data.length);
        setPhotos(data);
        setAlbumPhotos((albums: any) => setAlbumAndPhotos(albums, data.length, albumId));
      } else {
        setPhotos([]);
      }

      setFetching(false);
      setInitialLoad(false);
    } else {
      setFetching(false);
    }
  }, [roomId, albumId, isOnScreen]);

  // initial API call
  useEffect(() => {
    if (isOnScreen && initialLoad && mounted.current && photos.length === 0) {
      (async function fetchData() {
        await getPhotos();
      })();
    }

    return () => {
      if (!initialLoad && mounted.current && photos.length === 0) {
        mounted.current = false;
      }
      setFetching(false);
    };
  }, [isOnScreen, initialLoad]);

  // paginate api results, append incoming photos to the existing array
  const onClickLastThumbnail = useCallback(async () => {
    if (!fetching) {
      setFetching(true);

      // gradually increase the page number to fetch next data set from the api
      setPageNumber((prevState: number) => prevState + 1);

      // getting remaining photos
      const response: any = await dispatch(listRoomPhotosPerAlbum(roomId, albumId, pageNumber));

      if (response?.data) {
        const { data } = response;

        // append new photos to existing photos
        setPhotos((items) => [...items, ...data]);

        setFetching(false);
      } else {
        setFetching(false);
      }
    }
  }, [pageNumber, fetching]);

  // update the counter, this is to highlight last thumbnail
  useEffect(() => {
    setInternalPhotosCount(photos.length);
  }, [photos]);

  // refresh photos after everything uploaded
  // TODO::We need these per room and album, until that all the albums inside a room getting called despite photos aren't being uploaded in them
  useEffect(() => {
    const photoUploadCompleted = pusher
      .subscribe(`PhotoUploadingCompletedAnnouncement.Room.${roomId}`)
      .bind('App\\Events\\Websockets\\PhotoUploadingCompletedAnnouncement', getPhotos);

    return () => {
      photoUploadCompleted.unsubscribe(`PhotoUploadingCompletedAnnouncement.Room.${roomId}`);
    };
  }, [uploadingAlbums]);

  // refresh photos on each batch uploaded
  useEffect(() => {
    const assemblyUploaded = pusher
      .subscribe(`PhotoUploadingAssemblyCompletedAnnouncement.Room.${roomId}`)
      .bind('App\\Events\\Websockets\\PhotoUploadingAssemblyCompletedAnnouncement', getPhotos);

    return () => {
      assemblyUploaded.unsubscribe(`PhotoUploadingAssemblyCompletedAnnouncement.Room.${roomId}`);
    };
  }, [uploadingAlbums]);

  // refresh on photo delete
  useEffect(() => {
    if (refreshOnDelete) {
      (async function fetchData() {
        await getPhotos();
      })();
      setRefreshOnDelete(false);
      dispatch(setPhotosDeleted(false));

      // refresh and set rooms photos for photo select in select all mode
      dispatch(listLocationRoomsForPhotoSelect(location?.id));
      dispatch(refreshDataForPhotoSelection(null, location?.id));
    }
  }, [location, refreshOnDelete]);

  return (
    <Gallery
      ref={ref}
      roomId={roomId}
      albumId={albumId}
      photos={photos}
      fetching={fetching}
      title={title}
      hide={hide}
      editable={editable}
      setRefreshOnDelete={setRefreshOnDelete}
      photosCount={getPhotosCount(photosCount, internalPhotosCount)}
      onClickLastThumbnail={onClickLastThumbnail}
    />
  );
};

GalleryContainer.defaultProps = {
  hide: false,
};

const GalleryContainerMemo = memo(GalleryContainer, areEqual);
export { GalleryContainerMemo as Gallery };
