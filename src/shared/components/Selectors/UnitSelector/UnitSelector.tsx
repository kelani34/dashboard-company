import React, { memo } from "react";

import { Button } from "Components/Button";
// import { UnitLink } from "../UnitLink";
import { UnitLink } from "Containers/UnitSelector/UnitLink/UnitLink";
import { areEqual } from "Utils/equalityChecks";

import { UnitSelectorRoom } from "Containers/UnitSelector/UnitSelectorRoom";
import classes from "./unitSelector.module.css";

type UnitType = {
  id: number;
  name: string;
  rooms: any;
};

interface Props {
  unitTypes: Array<UnitType>;
  unitButtonSelected: number;
  accordionId: string;
  unitMenuHeading: string;
  roomOptions: string;
  onClick: (e: any) => void;
  onClickRoom: (e: any) => void;
  onClickUnit: (e: any) => void;
}

const UnitSelector = ({
  unitTypes,
  unitButtonSelected,
  accordionId,
  unitMenuHeading,
  roomOptions,
  onClick,
  onClickUnit,
  onClickRoom,
}: Props) => (
  <div className={`accordion ${classes.selectorWrapper}`} id={accordionId}>
    {unitTypes.length > 0 &&
      unitTypes.map((unit) => (
        <div key={`${unit.id}-${accordionId}`} className={`accordion-item ${classes.itemWrapper}`}>
          <h2
            className={`accordion-header ${classes.header} ${unitButtonSelected === unit.id ? "" : classes.closed}`}
            id={`${unitMenuHeading}-${unit.id}`}
          >
            <UnitLink id={unit.id} name={unit.name} onClickUnit={onClickUnit} />

            <Button
              id={`${unit.id}${unitMenuHeading}`}
              className={`accordion-button collapsed ${classes.currentUnit}`}
              type="button"
              data-bs-target={`#${roomOptions}-${unit.id}`}
              aria-expanded="false"
              aria-controls={`${roomOptions}-${unit.id}`}
              onClick={onClick}
            />
          </h2>

          <div
            id={`${roomOptions}-${unit.id}`}
            className={`accordion-collapse collapse ${unitButtonSelected === unit.id ? "show" : ""}`}
            aria-labelledby={`${unitMenuHeading}-${unit.id}`}
            data-bs-parent={accordionId}
          >
            <div className={`accordion-body ${classes.menuBody}`}>
              {unit?.rooms.length > 0 &&
                unit.rooms.map(({ id, room_type: roomType }) => (
                  <UnitSelectorRoom
                    key={id}
                    id={id}
                    roomType={roomType}
                    className={classes.roomOption}
                    unit={unit}
                    onRoomClick={onClickRoom}
                  />
                ))}
            </div>
          </div>
        </div>
      ))}
  </div>
);

const UnitSelectorMemo = memo(UnitSelector, areEqual);

export { UnitSelectorMemo as UnitSelector };
