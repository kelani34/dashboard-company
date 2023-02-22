import React, { memo, useCallback, useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { RocketDryRoomHeader, LocationEquipment } from 'Components/RocketDry';
import { SpinnerBlock } from 'Components/SpinnerBlock';

import { getRoomEquipmentList } from 'Containers/RocketDry/actions';

import { useRocketDryFunctions } from 'Context/RocketDry';

interface Props {
  room: any;
}

const EquipmentLogRoomContainer = ({ room }: Props) => {
  const dispatch = useDispatch();

  const mounted = useRef(true);

  const [equipmentList, setEquipmentList] = useState([]);
  const [fetching, setFetching] = useState(false);

  // room data
  const {
    id: roomId,
    room_type: { name: roomType },
  } = room;

  const { setIsInfoModalOpen }: any = useRocketDryFunctions();

  const onInfoIconClick = useCallback(() => {
    setIsInfoModalOpen(true);
  }, []);

  const getEquipmentList = useCallback(async () => {
    setFetching(true);

    const response: any = await dispatch(getRoomEquipmentList(roomId));

    if (mounted) {
      if (response?.data) {
        const { data } = response;
        setEquipmentList(data);
      } else {
        setEquipmentList([]);
      }

      setFetching(false);
    }
  }, [roomId]);

  // initial fetch
  useEffect(() => {
    mounted.current = true;
    (async function fetchData() {
      await getEquipmentList();
    })();

    return () => {
      if (mounted) {
        mounted.current = false;
      }
    };
  }, []);

  return (
    <div>
      <RocketDryRoomHeader icon={roomType} title={roomType} />
      <br />
      <SpinnerBlock fetching={fetching} />
      {!fetching && <LocationEquipment equipmentList={equipmentList} onInfoIconClick={onInfoIconClick} />}
    </div>
  );
};

const EquipmentLogRoomContainerMemo = memo(EquipmentLogRoomContainer, areEqual);

export { EquipmentLogRoomContainerMemo as EquipmentLogRoom };
