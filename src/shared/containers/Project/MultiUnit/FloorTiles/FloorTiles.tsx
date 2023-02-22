import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";
import { FloorTile } from "Containers/Project/MultiUnit/FloorTile";

interface Props {
  floors: any;
  onFloorTitleClick: (e: any) => void;
}

const FloorTilesContainer = ({ floors, onFloorTitleClick }: Props) =>
  floors.map(({ id, name }: any) => <FloorTile key={id} id={id} name={name} onTileClick={onFloorTitleClick} />);

const FloorTilesContainerMemo = memo(FloorTilesContainer, areEqual);

export { FloorTilesContainerMemo as FloorTiles };
