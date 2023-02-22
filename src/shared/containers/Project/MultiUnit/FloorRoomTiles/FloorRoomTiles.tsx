import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

import { FloorRoomTile } from "Containers/Project/MultiUnit/FloorRoomTiles/FloorRoomTile";

interface Props {
  floors: any;
}

const FloorRoomTilesContainer = ({ floors }: Props) =>
  floors.map(({ id, name, rooms }: any) => rooms.length > 0 && <FloorRoomTile key={id} id={id} name={name} />);

const FloorRoomTilesContainerMemo = memo(FloorRoomTilesContainer, areEqual);

export { FloorRoomTilesContainerMemo as FloorRoomTiles };
