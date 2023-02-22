import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { RocketDryLocation } from 'Containers/RocketDry';
import { LoadMoreButton } from 'Components/Button';

import { propertySelector } from 'Containers/RocketScan/selectors';
import { listLocationsForRocketDry } from 'Containers/RocketDry/actions';

const RocketDryLocationsContainer = () => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  const property = useSelector(propertySelector, areEqual);

  // local variables
  const [locations, setLocations] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  // api
  const getLocations = useCallback(
    async (page = 1) => {
      const response: any = await dispatch(listLocationsForRocketDry(property.id, page));
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
    [property, mounted]
  );

  // initial fetch
  useEffect(() => {
    if (property?.id) {
      (async function fetchData() {
        await getLocations();
      })();
    }
  }, [property]);

  // load more locations
  const onClickLoadMore = useCallback(async () => {
    await getLocations(currentPage + 1);
  }, [property, currentPage]);

  return (
    <>
      <SpinnerBlock fetching={fetching} />

      {locations.length > 0 &&
        locations.map((location: any) => <RocketDryLocation key={location.id} location={location} />)}

      {total > 15 && locations.length >= 15 && total - locations.length > 0 && (
        <LoadMoreButton type="Locations" totalItems={total - locations.length} loadMoreItemsClick={onClickLoadMore} />
      )}
    </>
  );
};

const RocketDryLocationsContainerMemo = memo(RocketDryLocationsContainer, areEqual);
export { RocketDryLocationsContainerMemo as RocketDryLocations };
