import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';
import { PhotoGallery } from 'Components/PhotoGallery';

import { setFileUploadingRoom, setRefreshRoomPhotos } from 'Containers/DropZone/actions';
import { listRoomPhotosPerAlbum } from 'Containers/Project/Unit/Rooms/actions';
import { projectIdSelector } from 'Containers/Project/selectors';
import { selectedMultiUnitSelector } from 'Containers/Project/Unit/selector';
import { getPhotosCount } from 'Utils/helpers';
import { listCarouselPhotos } from 'Containers/PhotoViewCarousel/actions';
import { ADD_LOCATIONS, PHOTO_MANAGEMENT } from 'Utils/constants';
import { setSelectedUnitTypeUrl } from 'Containers/AddLocationTab';
import { setDeletedPhoto } from 'Containers/Thumbnail/actions';
import { photoDeletedSelector } from 'Containers/Thumbnail/selector';
import { fileUploadingRoomAndRoomSelector, refreshRoomPhotosSelector } from 'Containers/DropZone/selector';

interface Props {
  title: string;
  roomId: number;
  albumId: number;
  hide?: boolean;
}

const PhotoGalleryContainer = ({ title = 'Kitchen', roomId, albumId, hide }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const { pathname } = location;

  const photoDeleted = useSelector(photoDeletedSelector, areEqual);
  const selectedMultiUnit = useSelector(selectedMultiUnitSelector, areEqual);
  const selectedProjectId = useSelector(projectIdSelector, areEqual);
  const fileUploadingRoomAndRoom = useSelector(fileUploadingRoomAndRoomSelector, areEqual);
  const refreshRoomPhotos = useSelector(refreshRoomPhotosSelector, areEqual);

  const [photos, setPhotos] = useState([]);
  const [imageList, setImageList] = useState<object[]>([]);
  const [internalPhotosCount, setInternalPhotosCount] = useState(0);
  const [photosCount, setPhotosCount] = useState(0);
  const [pageNumber, setPageNumber] = useState(2);
  const [isUploading, setIsUploading] = useState(false);

  // TODO:: to be moved into a redux object
  const fetchData = useCallback(async () => {
    const response: any = await dispatch(listRoomPhotosPerAlbum(roomId.toString(), albumId.toString()));

    if (response?.data) {
      const { data } = response;
      const { meta } = response;
      const { total } = meta;

      if (data.length !== photos.length) {
        setPhotosCount(total);
        setInternalPhotosCount(data.length);
        setPhotos(data);
      }

      setPageNumber(2);
    }

    return true;
  }, []);

  // fetchData internally once the page loaded
  useEffect(() => {
    let mounted = true;

    if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}/single`) && mounted && photos.length === 0) {
      (async function fetch() {
        await fetchData();
      })();
      dispatch(setFileUploadingRoom({}));
    }
    return () => {
      dispatch(setRefreshRoomPhotos(false));
      mounted = false;
    };
  }, [pathname]);

  // fetchData once the user has finished photo uploading
  useEffect(() => {
    if (refreshRoomPhotos?.refresh) {
      const { roomId: uploadingRoomId, albumId: uploadingAlbumId, refresh } = refreshRoomPhotos;

      if (uploadingRoomId === roomId && uploadingAlbumId === albumId && refresh) {
        (async function fetch() {
          await fetchData();
        })();

        // dispatch(setFileUploadingRoom({}));
        setIsUploading(false);
      }
    }
  }, [refreshRoomPhotos]);

  // modify the photos list
  useEffect(() => {
    if (photos.length > 0) {
      const photoMapped = photos.map((photo: any) => ({
        id: photo.id,
        rawSrcUrl: photo.sizes.raw,
        thumbnailSrcUrl: photo.sizes.large,
        irSrcUrl: photo.photo,
      }));

      setImageList(photoMapped);
    }
  }, [photos]);

  // on photo delete we'll do below actions
  useEffect(() => {
    let mounted = true;
    if (photoDeleted && mounted) {
      // we'll refresh only the specific album
      if (imageList.some((photo: any) => photo.id.toString() === photoDeleted.toString())) {
        (async function fetch() {
          await fetchData();
        })();
      }
    }

    return () => {
      mounted = false;
    };
  }, [photoDeleted]);

  // we'll set the back url path of photo view
  useEffect(() => {
    if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}/single`)) {
      dispatch(setSelectedUnitTypeUrl('addLocations/single'));
    }
  }, [pathname]);

  const onClickThumbnail = useCallback(
    (urls: any) => {
      const { id } = urls;

      dispatch(setDeletedPhoto(''));
      dispatch(listCarouselPhotos(selectedProjectId, selectedMultiUnit?.type, id.toString()));

      if (!isUploading) {
        history.push('/photoView');
      }
    },
    [selectedProjectId, selectedMultiUnit, pageNumber, isUploading]
  );

  const onClickLastThumbnail = useCallback(async () => {
    if (!isUploading) {
      // fetching data internally
      // getting remaining photos
      const response: any = await dispatch(listRoomPhotosPerAlbum(roomId.toString(), albumId.toString(), pageNumber));

      if (response?.data) {
        const { data } = response;

        const mappedData = data.map((photo: any) => ({
          id: photo.id,
          thumbnailSrcUrl: photo.sizes.large,
          irSrcUrl: photo.photo,
        }));

        // append new photos to existing photos
        setImageList((images) => [...images, ...mappedData]);
      }
    }

    setPageNumber((prevState: number) => prevState + 1);
  }, [pageNumber, isUploading]);

  useEffect(() => {
    if (fileUploadingRoomAndRoom) {
      const { roomId: uploadingRoomId, albumId: uploadingAlbumId } = fileUploadingRoomAndRoom;

      setIsUploading(uploadingRoomId === roomId && uploadingAlbumId === albumId);
    }
  }, [fileUploadingRoomAndRoom]);

  return (
    <PhotoGallery
      roomId={roomId}
      albumId={albumId}
      fileUploading={isUploading}
      title={title}
      hide={hide}
      photosCount={getPhotosCount(photosCount, internalPhotosCount)}
      imageList={imageList}
      onClickThumbnail={onClickThumbnail}
      onClickLastThumbnail={onClickLastThumbnail}
    />
  );
};

PhotoGalleryContainer.defaultProps = {
  hide: false,
};

const PhotoGalleryContainerMemo = memo(PhotoGalleryContainer, areEqual);

export { PhotoGalleryContainerMemo as PhotoGallery };
