import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { TabContent } from 'Components/Tabs';

import { UnitTiles } from 'Containers/Project/MultiUnit/UnitTiles';
import { MultiUnitTabs } from 'Components/Tabs/MultiUnitTabs';

import { UnitRoomTiles } from 'Containers/Project/MultiUnit/UnitRoomTiles';
import { MultiUnitRoomTabs } from 'Components/Tabs/MultiUnitRoomTabs';
import { FloorTiles } from 'Containers/Project/MultiUnit/FloorTiles';
import { FloorRoomTiles } from 'Containers/Project/MultiUnit/FloorRoomTiles';

import classes from './multiUnitTabs.module.css';

interface Props {
  showAllUnits?: boolean;
  units: any;
  floors: any;
  onUnitTileClick: (e: any) => void;
  onFloorTitleClick: (e: any) => void;
}

const MultiUnitTabsContainer = ({ showAllUnits, units, floors, onUnitTileClick, onFloorTitleClick }: Props) => (
  <div className={classes.multiUnitTabsWrapper}>
    <MultiUnitTabs>
      <TabContent key="all-units-tab" id="all-units" className="pt-3 show active">
        <div className={classes.tilesContainer}>
          {units.length > 0 ? (
            <UnitTiles onUnitTileClick={onUnitTileClick} units={units} />
          ) : (
            <p className={classes.noLocations}>No added location yet. Add a new Location</p>
          )}
        </div>
      </TabContent>
      <TabContent key="all-floors-tab" id="all-floors" className="pt-3">
        <div className={classes.tilesContainer}>
          {floors.length > 0 ? (
            <FloorTiles onFloorTitleClick={onFloorTitleClick} floors={floors} />
          ) : (
            <p className={classes.noLocations}>No added location yet. Add a new Location</p>
          )}
        </div>
      </TabContent>
    </MultiUnitTabs>
    {showAllUnits && (
      <MultiUnitRoomTabs>
        <TabContent key="all-units-room-tab" id="all-units-room" className="pt-3 show active">
          {units.length > 0 ? (
            <div className={classes.unitsRooms}>
              <UnitRoomTiles units={units} />
            </div>
          ) : (
            <p className={classes.noLocations}>No added location yet. Add a new Location</p>
          )}
        </TabContent>
        <TabContent key="all-floors-room-tab" id="all-floors-room" className="pt-3">
          {floors.length > 0 ? (
            <div className={classes.unitsRooms}>
              <FloorRoomTiles floors={floors} />
            </div>
          ) : (
            <p className={classes.noLocations}>No added location yet. Add a new Location</p>
          )}
        </TabContent>
      </MultiUnitRoomTabs>
    )}
  </div>
);

MultiUnitTabsContainer.defaultProps = {
  showAllUnits: true,
};

const MultiUnitTabsContainerMemo = memo(MultiUnitTabsContainer, areEqual);

export { MultiUnitTabsContainerMemo as MultiUnitTabs };
