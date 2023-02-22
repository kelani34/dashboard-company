import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { areEqual } from 'Utils/equalityChecks';

import { multiUnitsSelector } from 'Containers/Project/Unit/selector';
import { LocationsPlaceholder } from 'Containers/LocationsPlaceholder';
import { ADD_LOCATIONS, ALL_LOCATIONS, PHOTO_MANAGEMENT } from 'Utils/constants';
import { Spinner } from 'Components/Spinner';
import { useHistory } from 'react-router-dom';

import { UnitHeader } from 'Components/Project/Unit';
import { MultiUnitTabs } from 'Containers/Project/MultiUnit';
import { floorWithRoomsSelector } from 'Containers/Project/Floor/selectors';

import { setSelectedMultiUnit } from 'Containers/Project/Unit/actions';
import { fetchingPropertiesSelector } from 'Containers/Project/selectors';
import classes from './multiUnit.module.css';

const locationNameSelector = ({ projects: { selectedProjectId, myProjects } }) => ({
  selectedProjectId,
  projects: myProjects.data || [],
});

const MultiUnitContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  // const [showAllUnits, setShowAllUnits] = useState(true);

  const { selectedProjectId, projects } = useSelector(locationNameSelector, areEqual);

  // Pull the address out and use it to display the project
  const {
    address: { address: addressName },
  } = projects.find((project: any) => project.id.toString() === selectedProjectId);

  const onUnitTileClick = useCallback(({ id, name }: any) => {
    dispatch(
      setSelectedMultiUnit({
        id,
        name,
        type: 'unit',
      })
    );

    history.push(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}/multiUnitView`);
  }, []);

  const onFloorTitleClick = useCallback(({ id, name }: any) => {
    dispatch(
      setSelectedMultiUnit({
        id,
        name,
        type: 'floor',
      })
    );

    history.push(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}/multiUnitView`);
  }, []);

  const units: any = useSelector(multiUnitsSelector, areEqual);
  const floors: any = useSelector(floorWithRoomsSelector, areEqual);
  const fetching: any = useSelector(fetchingPropertiesSelector, areEqual);

  const onAddButtonClick = useCallback(() => {
    history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}`);
  }, []);

  const [view, setView] = useState(null);

  const views = {
    multiUnitTabs: (
      <>
        <UnitHeader unitName={addressName} unitType="highrise" />
        <MultiUnitTabs
          units={units}
          floors={floors}
          onUnitTileClick={onUnitTileClick}
          onFloorTitleClick={onFloorTitleClick}
        />
      </>
    ),
    noLocations: (
      <LocationsPlaceholder
        heading="No locations yet. Add a new location, or start adding photos."
        onTabClick={onAddButtonClick}
      />
    ),
  };

  useEffect(() => {
    if ((units.length > 0 && !fetching) || (floors.length && !fetching)) {
      setView(views.multiUnitTabs);
    } else if (!fetching) {
      setView(views.noLocations);
    }
  }, [units, floors, fetching]);

  return (
    <div className={classes.multiUnitWrapper}>
      {fetching && <Spinner loading={fetching} />}
      {view}
    </div>
  );
};

const MultiUnitContainerMemo = memo(MultiUnitContainer, areEqual);

export { MultiUnitContainerMemo as MultiUnit };
