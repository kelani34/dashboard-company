import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { listRoomsForNotes } from 'Containers/Notes/actions';

import { LoadMoreNotesButton } from 'Components/Notes';
import { NotesRoom } from 'Containers/Notes';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { useNotesFunctions } from 'Context/Notes';

interface Props {
  locationName: string;
  locationId: number;
  isLocationOpen: boolean;
}

const NotesRoomsContainer = ({ locationName, locationId, isLocationOpen }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  // get note filter and search related functions
  const { filterBookmarked, filterFlagged, searchValue }: any = useNotesFunctions();

  // local variables
  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  // selectors
  const getRooms = useCallback(
    async (page = 1) => {
      setFetching(true);

      const response: any = await dispatch(
        listRoomsForNotes(locationId, page, filterBookmarked, filterFlagged, searchValue)
      );

      if (mounted) {
        if (response?.data) {
          const { data, meta } = response;
          const { total, current_page: current } = meta;
          setTotal(total);
          setCurrentPage(current);

          if (page > 1) {
            setRooms((items) => [...items, ...data]);
          } else {
            setRooms(data);
          }
          setFetching(false);
        }
      } else {
        setRooms([]);
        setFetching(false);
      }
    },
    [locationId, mounted, filterBookmarked, filterFlagged, searchValue]
  );

  // initial fetch
  // fetch on search
  // fetch on filter
  useEffect(() => {
    if (isLocationOpen && locationId && (searchValue.length >= 0 || searchValue.length === 0)) {
      (async function fetchData() {
        await getRooms();
      })();
    }
  }, [isLocationOpen, locationId, searchValue, filterBookmarked, filterFlagged]);

  // load more rooms for location
  const onClickLoadMore = useCallback(async () => {
    await getRooms(currentPage + 1);
  }, [locationId, currentPage]);

  return (
    <>
      {rooms.length > 0 &&
        rooms.map((room: any) => <NotesRoom key={`room-${room.id}`} room={room} locationName={locationName} />)}

      <SpinnerBlock fetching={fetching} />

      {total > 2 && rooms.length >= 2 && total - rooms.length > 0 && (
        <LoadMoreNotesButton type="Rooms" totalNotes={total - rooms.length} loadMoreNotesClick={onClickLoadMore} />
      )}
    </>
  );
};

const NotesRoomsContainerMemo = memo(NotesRoomsContainer, areEqual);

export { NotesRoomsContainerMemo as NotesRoomsContainer };
