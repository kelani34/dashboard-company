import React, { memo } from "react";

import { MultiUnitTabs } from "Components/Tabs/MultiUnitTabs";
import { TabContent } from "Components/Tabs";

import { UnitListItem } from "Containers/Project/MultiUnit/UnitListItem/UnitListItem";
import { FloorListItem } from "Containers/Project/MultiUnit/FloorListItem";

import { areEqual } from "Utils/equalityChecks";
import classes from "./unitGallery.module.css";

interface Props {
  units: any;
  floors: any;
  onUnitTileClick: (e: any) => void;
  onFloorTileClick: (e: any) => void;
}

const UnitGalleryContainer = ({ units, floors, onUnitTileClick, onFloorTileClick }: Props) => (
  <MultiUnitTabs>
    <TabContent key="all-units-tab" id="all-units" className="pt-3 show active">
      <div className="d-flex flex-column w-100">
        <div className="list-group">
          {units.length > 0 ? (
            units.map((unit) => <UnitListItem key={unit.id} unit={unit} onSelectItem={onUnitTileClick} />)
          ) : (
            <p className={classes.placeholder}>No added location yet. Add a new Location</p>
          )}
        </div>
      </div>
    </TabContent>
    <TabContent key="all-floors-tab" id="all-floors" className="pt-3">
      <div className="d-flex flex-column w-100">
        <div className="list-group">
          {floors.length > 0 ? (
            floors.map((floor) => <FloorListItem key={floor.id} floor={floor} onSelectItem={onFloorTileClick} />)
          ) : (
            <p className={classes.placeholder}>No added location yet. Add a new Location</p>
          )}
        </div>
      </div>
    </TabContent>
  </MultiUnitTabs>
);

const UnitGalleryContainerMemo = memo(UnitGalleryContainer, areEqual);

export { UnitGalleryContainerMemo as UnitGallery };
