import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

import { UnitRoomTile } from "Containers/Project/MultiUnit/UnitRoomTiles/UnitRoomTile";

interface Props {
  units: any;
}

const UnitRoomTilesContainer = ({ units }: Props) =>
  units.map(({ id, name, rooms }: any) => rooms.length > 0 && <UnitRoomTile key={id} id={id} name={name} />);

const UnitRoomTilesContainerMemo = memo(UnitRoomTilesContainer, areEqual);

export { UnitRoomTilesContainerMemo as UnitRoomTiles };
