import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { useOnScreen } from 'Hooks/useOnScreen';
import { useDispatch, useSelector } from 'react-redux';
import { locationSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { albumTypesSelector, selectedCategoriesSelector } from 'Containers/RocketScan/selectors';
import { selectedRoomIdSelector } from 'Containers/RocketScan/RoomsView/RoomButtons/selectors';
import { listLocationRooms } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { currentPageSelector, lastPageSelector } from 'Containers/RocketScan/RoomsView/Rooms/selectors';

import classes from './roomContent.module.css';
import { RoomContentBody } from '../RoomContentBody';
import { RoomContentHeader } from '../RoomContentHeader';

const showOrHideRoom = (albumPhotos, selectedCategories) => {
  if (albumPhotos.length > 0 && selectedCategories.length > 0) {
    let photosTotal = 0;
    let album: any = {};

    selectedCategories.sort((a, b) => b - a);

    selectedCategories.forEach((item) => {
      const { photos } = albumPhotos.find((element) => element.id === item);

      if (photos !== undefined) {
        photosTotal += photos;
        album = { photos };
      }
    });

    const { photos } = album;

    return photosTotal > 0 && photos > 0;
  }
  return true;
};

interface Props {
  room: any;
  isLastItem: boolean;
}

const RoomContentContainer = ({ room, isLastItem }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const isOnScreen = useOnScreen(ref);

  // get room data
  const { id: roomId, bookmarked_notes_count: bookmarkedNotesCount, flagged_notes_count: flaggedNotesCount } = room;

  // local variables
  const [editable, setEditable] = useState(false);
  const [albumPhotos, setAlbumPhotos] = useState([]);

  // selectors
  const location = useSelector(locationSelector, areEqual);
  const albumTypes = useSelector(albumTypesSelector, areEqual);
  const selectedRoomId = useSelector(selectedRoomIdSelector, areEqual);
  const currentPage = useSelector(currentPageSelector, areEqual);
  const lastPage = useSelector(lastPageSelector, areEqual);
  const selectedCategoriesFilter = useSelector(selectedCategoriesSelector, areEqual);

  const onEditButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setEditable((prev) => !prev);
    },
    [editable]
  );

  useEffect(() => {
    if (albumTypes.length > 0) {
      const albums = albumTypes.map(({ id }: any) => ({ id, photos: 0 }));
      setAlbumPhotos(albums);
    }
  }, [albumTypes]);

  // lazy load next rooms, passed from the parent
  useEffect(() => {
    if (isOnScreen && isLastItem && location?.id) {
      if (currentPage < lastPage) {
        dispatch(listLocationRooms(location.id, currentPage + 1));
      }
    }
  }, [isOnScreen, location, currentPage, lastPage]);

  // scroll to the selected room
  useEffect(() => {
    if (selectedRoomId && selectedRoomId === room.id && ref.current) {
      ref.current.scrollIntoView();
    }
  }, [selectedRoomId]);

  return (
    showOrHideRoom(albumPhotos, selectedCategoriesFilter) && (
      <div
        className={`d-flex flex-column justify-content-flex-start w-100 py-0 px-3 ${classes.containerWrapper}`}
        id={roomId.toString()}
        ref={(roomContentRef) => {
          ref.current = roomContentRef;
        }}
      >
        <RoomContentHeader room={room} editable={editable} onEditButtonClick={onEditButtonClick} />
        <RoomContentBody
          room={room}
          editable={editable}
          setAlbumPhotos={setAlbumPhotos}
          onEditButtonClick={onEditButtonClick}
          hasBookmarked={bookmarkedNotesCount > 0}
          hasFlagged={flaggedNotesCount > 0}
        />
      </div>
    )
  );
};

const RoomContentContainerMemo = memo(RoomContentContainer, areEqual);

export { RoomContentContainerMemo as RoomContentContainer };
