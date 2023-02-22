import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { listPhotosForNotes } from 'Containers/Notes/actions';
import { LoadMoreNotesButton } from 'Components/Notes';
import { NotesPhoto } from 'Containers/Notes';
import { Spinner } from 'Components/Spinner';

import { useNotesFunctions } from 'Context/Notes';
import classes from './notesPhotos.module.css';

interface Props {
  roomId: number;
  roomType: string;
  locationName: string;
  isRoomNotesOpen: boolean;
}

const NotesPhotosContainer = ({ roomId, roomType, locationName, isRoomNotesOpen }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  // get note filter and search related functions
  const { filterBookmarked, filterFlagged, searchValue }: any = useNotesFunctions();

  // local variables
  const [photos, setPhotos] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  // api
  const getPhotos = useCallback(
    async (page = 1) => {
      const response: any = await dispatch(
        listPhotosForNotes(roomId, page, filterBookmarked, filterFlagged, searchValue)
      );
      setFetching(true);
      if (mounted) {
        if (response?.data) {
          const { data, meta } = response;
          const { total, current_page: current } = meta;
          setTotal(total);
          setCurrentPage(current);

          if (page > 1) {
            setPhotos((items) => [...items, ...data]);
          } else {
            setPhotos(data);
          }
          setFetching(false);
        }
      } else {
        setPhotos([]);
        setFetching(false);
      }
    },
    [mounted, filterBookmarked, filterFlagged, searchValue]
  );

  // initial fetch
  // fetch on search
  // fetch on filter
  useEffect(() => {
    if (isRoomNotesOpen && (searchValue.length >= 0 || searchValue.length === 0)) {
      (async function fetchData() {
        await getPhotos();
      })();
    }
  }, [isRoomNotesOpen, searchValue, filterBookmarked, filterFlagged]);

  const onClickLoadMore = useCallback(async () => {
    await getPhotos(currentPage + 1);
  }, [currentPage]);

  return (
    <>
      {photos.length > 0 &&
        photos.map((photo: any, index: number) => (
          <NotesPhoto
            key={photo.id}
            photo={photo}
            locationName={locationName}
            roomType={roomType}
            photoIndex={index + 1}
            thumbnailSrcUrl={photo.sizes.large}
            isRoomNotesOpen={isRoomNotesOpen}
          />
        ))}

      {fetching && (
        <div className={classes.spinnerBlock}>
          <Spinner loading />
        </div>
      )}

      {total > 2 && photos.length >= 2 && total - photos.length > 0 && (
        <LoadMoreNotesButton type="Photos" totalNotes={total - photos.length} loadMoreNotesClick={onClickLoadMore} />
      )}
    </>
  );
};

const NotesPhotosContainerMemo = memo(NotesPhotosContainer, areEqual);

export { NotesPhotosContainerMemo as NotesPhotos };
