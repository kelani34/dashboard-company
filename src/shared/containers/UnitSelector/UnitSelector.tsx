import React, { memo, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { areEqual } from "Utils/equalityChecks";
import { ALL_LOCATIONS, PHOTO_MANAGEMENT } from "Utils/constants";
import { UnitSelector } from "Components/Selectors/UnitSelector";
import { setSelectedMultiUnit } from "Containers/Project/Unit/actions";

import { useHistory } from "react-router-dom";
import { setSelectedRoomId } from "Containers/Project/Unit/Rooms/actions";
import { unitsSelector } from "Containers/UnitSelector/selector";

interface Props {
  accordionId: string;
  unitMenuHeading: string;
  roomOptions: string;
}

export const UnitSelectorContainer = ({ accordionId, unitMenuHeading, roomOptions }: Props) => {
  const units = useSelector(unitsSelector, areEqual);
  const dispatch = useDispatch();
  const history = useHistory();

  const [unitButtonSelected, setUnitButtonSelected] = useState(0);

  const onClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id } = e.target;
      const buttonId = Number(id.substring(0, 4));

      setUnitButtonSelected(buttonId);
    },
    [unitButtonSelected]
  );

  const onUnitClick = useCallback(({ id, name }: any) => {
    dispatch(
      setSelectedMultiUnit({
        id,
        name,
        type: "unit",
      })
    );

    history.push(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}/multiUnitView`);
  }, []);

  const onClickRoom = useCallback(({ unit, roomId }: any) => {
    const { id: unitId, name } = unit;

    dispatch(
      setSelectedMultiUnit({
        id: unitId,
        name,
        type: "unit",
      })
    );

    dispatch(setSelectedRoomId(roomId));

    history.push(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}/multiUnitView`);
  }, []);

  return (
    units.length > 0 && (
      <UnitSelector
        unitTypes={units}
        unitButtonSelected={unitButtonSelected}
        accordionId={accordionId}
        unitMenuHeading={unitMenuHeading}
        roomOptions={roomOptions}
        onClick={onClick}
        onClickRoom={onClickRoom}
        onClickUnit={onUnitClick}
      />
    )
  );
};

const UnitSelectorContainerMemo = memo(UnitSelectorContainer, areEqual);

export { UnitSelectorContainerMemo as UnitSelector };
