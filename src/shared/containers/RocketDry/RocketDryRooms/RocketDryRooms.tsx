import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { MoistureAtmosphericRoom, EquipmentLogRoom } from 'Containers/RocketDry';
import { LoadMoreButton } from 'Components/Button';

import { listLocationRoomsForRocketDry } from 'Containers/RocketDry/actions';
import { useRocketDryFunctions } from 'Context/RocketDry';

interface Props {
  locationId: number;
  isLocationOpen: boolean;
}

const RocketDryRoomsContainer = ({ locationId, isLocationOpen }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  const { isEquipmentFolder }: any = useRocketDryFunctions();

  // local variables
  const [rooms, setRooms] = useState([]);
  const [total, setTotal] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false);

  // api
  const getRooms = useCallback(
    async (page = 1) => {
      const response: any = await dispatch(listLocationRoomsForRocketDry(locationId, page));
      setFetching(true);
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
    [locationId, mounted]
  );

  // initial fetch
  useEffect(() => {
    if (isLocationOpen && locationId) {
      (async function fetchData() {
        await getRooms();
      })();
    }
  }, [isLocationOpen, locationId]);

  // load more rooms for location
  const onClickLoadMore = useCallback(async () => {
    await getRooms(currentPage + 1);
  }, [locationId, currentPage]);

  return (
    <>
      {rooms.length > 0 &&
        rooms.map((room: any) =>
          isEquipmentFolder ? (
            <EquipmentLogRoom key={room.id} room={room} />
          ) : (
            <MoistureAtmosphericRoom key={room.id} room={room} />
          )
        )}


      <SpinnerBlock fetching={fetching} />

      {total > 15 && rooms.length >= 15 && total - rooms.length > 0 && (
        <LoadMoreButton type="Rooms" totalItems={total - rooms.length} loadMoreItemsClick={onClickLoadMore} />
      )}
    </>
  );
};

const RocketDryRoomsContainerMemo = memo(RocketDryRoomsContainer, areEqual);
export { RocketDryRoomsContainerMemo as RocketDryRooms };
