import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";
import { UnitTile } from "Containers/Project/MultiUnit/UnitTile";

interface Props {
  units: any;
  onUnitTileClick: (e: any) => void;
}

const UnitTilesContainer = ({ units, onUnitTileClick }: Props) =>
  units.map(({ id, name }) => <UnitTile key={id} id={id} name={name} onTileClick={onUnitTileClick} />);

const UnitTilesContainerMemo = memo(UnitTilesContainer, areEqual);

export { UnitTilesContainerMemo as UnitTiles };
