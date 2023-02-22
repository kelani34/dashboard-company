import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { RoomTile } from 'Containers/RocketScan';
import { Spinner } from 'Components/Spinner';
import { AddRoomPlaceholder, InaccessiblePlaceholder } from 'Components/RocketScan';

import { listLocationRoomTiles } from 'Containers/RocketScan/MultiUnit/RoomTiles/actions';
import { propertySelector } from 'Containers/RocketScan/selectors';

interface Props {
  location: any;
  isOnScreen: boolean;
  roomsData: any;
  setRoomsData: (e: any) => void;
}

const thumbnailSelector = (thumbnail: any) => {
  if (thumbnail) {
    const { sizes } = thumbnail;

    return sizes.large;
  }

  return '';
};

const RoomTilesContainer = ({ location, isOnScreen, roomsData, setRoomsData }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(false);

  // show spinner locally when api is being called
  const [fetching, setFetching] = useState(true);
  // this will make sure the photos API will be called once, not every time user scrolls up down
  const [initialLoad, setInitialLoad] = useState(false);

  const [rooms, setRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [isCommercialProject, setIsCommercialProject] = useState(false);

  const property = useSelector(propertySelector, areEqual);

  const {
    id: locationId,
    location_type: { name: locationType },
    is_commercial: isCommercial,
    is_accessible: isAccessible,
  } = location;

  useEffect(() => {
    if (property?.id) {
      const { name } = property;
      setIsCommercialProject(name === 'commercial');
    }
  }, [property]);

  const staticGetRooms = useCallback(
    async (locationId: number, pageNumber = null) => {
      // enable the local spinner
      setFetching(true);

      const response: any = await dispatch(listLocationRoomTiles(locationId, pageNumber || 1));

      if (response?.data && mounted.current) {
        const { data, meta } = response;
        const {
          meta: { current_page: current, last_page: last },
        } = response;

        // update state only if the component mounted
        if (data.length > 0) {
          setCurrentPage(current);
          setLastPage(last);

          if (pageNumber > 1) {
            setRooms((items) => {
              // set redux object
              const rooms = [...items, ...data];
              setRoomsData({
                meta,
                rooms,
              });
              return rooms;
            });
          } else {
            const rooms = data;
            setRooms(rooms);
            setRoomsData({
              meta,
              rooms,
            });
          }
        } else {
          setRooms([]);
        }

        setFetching(false);
        setInitialLoad(true);
      } else {
        setFetching(false);
      }
    },
    [mounted]
  );

  // fetchData internally per album as user scrolls down
  const getRooms = useCallback(
    async (pageNumber = null) => {
      const { id: locationId } = location;

      if (mounted.current) {
        if (!pageNumber) {
          await staticGetRooms(locationId, pageNumber);
        } else if (pageNumber) {
          await staticGetRooms(locationId, pageNumber);
        } else {
          setFetching(false);
        }
      }
    },
    [mounted]
  );

  // initial API call
  useEffect(() => {
    mounted.current = true;
    if (!initialLoad && mounted.current && isOnScreen) {
      (async function fetchData() {
        await getRooms();
      })();
    }

    return () => {
      mounted.current = false;
    };
  }, [isOnScreen, initialLoad]);

  return (
    <>
      {isAccessible &&
        rooms.length > 0 &&
        rooms.map(({ id, room_type: { name }, photos_count: photosCount, thumbnail, photos }: any, index: number) => (
          <RoomTile
            key={id}
            location={location}
            roomId={id}
            roomName={name}
            photosCount={photosCount}
            thumbnailSrcUrl={thumbnailSelector(thumbnail)}
            isLastItem={index === rooms.length - 1}
            currentPage={currentPage}
            lastPage={lastPage}
            roomsData={roomsData}
            photos={photos}
            getRooms={getRooms}
          />
        ))}
      {!isAccessible && <InaccessiblePlaceholder location={location} />}
      {!fetching && rooms.length === 0 && isAccessible && (
        <AddRoomPlaceholder
          location={location}
          locationId={locationId}
          locationType={locationType}
          isCommercial={isCommercial}
          isCommercialProject={isCommercialProject}
        />
      )}
      <Spinner loading={fetching} />
    </>
  );
};

const RoomTilesContainerMemo = memo(RoomTilesContainer, areEqual);

export { RoomTilesContainerMemo as RoomTiles };
