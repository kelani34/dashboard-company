import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";

import { Rooms } from "Containers/Project/Unit/Rooms";
import { RoomButtons } from "Containers/Project/Unit/Rooms/RoomButtons";

import classes from "./unitContent.module.css";

interface Props {
  rooms: any;
  selectedRoomId: string;
  fetching: boolean;
}

const UnitContent = ({ rooms, selectedRoomId, fetching }: Props) => (
  <div className={`container-fluid p-2 position-relative ${classes.unitContentBase}`}>
    {!fetching && (
      <div className="row">
        <div className="col-3 d-flex flex-column justify-content-start align-items-center pr-3">
          <RoomButtons rooms={rooms} />
        </div>
        <div className="col-9">
          <Rooms rooms={rooms} selectedRoomId={selectedRoomId} />
        </div>
      </div>
    )}
  </div>
);

const UnitContentMemo = memo(UnitContent, areEqual);

export { UnitContentMemo as UnitContent };
