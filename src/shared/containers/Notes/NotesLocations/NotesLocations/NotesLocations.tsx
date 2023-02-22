import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { propertySelector } from 'Containers/RocketScan/selectors';
import { listLocationsForNotes } from 'Containers/Notes/actions';
import { LoadMoreNotesButton } from 'Components/Notes';
import { NotesLocation } from 'Containers/Notes';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { useNotesFunctions } from 'Context/Notes';

const NotesLocationsContainer = () => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  // get note filter and search related functions
  const { filterBookmarked, filterFlagged, searchValue }: any = useNotesFunctions();

  // local variables
  const [locations, setLocations] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  // selectors
  const property = useSelector(propertySelector, areEqual);

  // api
  const getLocations = useCallback(
    async (page = 1) => {
      const response: any = await dispatch(
        listLocationsForNotes(property.id, page, filterBookmarked, filterFlagged, searchValue)
      );
      setFetching(true);
      if (mounted) {
        if (response?.data) {
          const { data, meta } = response;
          const { total, current_page: current } = meta;
          setTotal(total);
          setCurrentPage(current);

          if (page > 1) {
            setLocations((items) => [...items, ...data]);
          } else {
            setLocations(data);
          }
          setFetching(false);
        }
      } else {
        setLocations([]);
        setFetching(false);
      }
    },
    [property, mounted, filterBookmarked, filterFlagged, searchValue]
  );

  // initial fetch
  // fetch on search
  // fetch on filter
  useEffect(() => {
    if (property?.id && (searchValue.length >= 0 || searchValue.length === 0)) {
      (async function fetchData() {
        await getLocations();
      })();
    }
  }, [property, searchValue, filterBookmarked, filterFlagged]);

  const onClickLoadMore = useCallback(async () => {
    await getLocations(currentPage + 1);
  }, [property, currentPage]);

  return (
    <>
      {locations.length > 0 &&
        locations.map((location: any) => <NotesLocation key={location.id} location={location} />)}

      <SpinnerBlock fetching={fetching} />

      {total > 2 && locations.length >= 2 && total - locations.length > 0 && (
        <LoadMoreNotesButton
          type="Locations"
          totalNotes={total - locations.length}
          loadMoreNotesClick={onClickLoadMore}
        />
      )}
    </>
  );
};

const NotesLocationsContainerMemo = memo(NotesLocationsContainer, areEqual);

export { NotesLocationsContainerMemo as NotesLocationsContainer };
