import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { useSelector } from 'react-redux';
import { SingleUnit } from 'Containers/Project/Unit/SingleUnit';
import { MultiUnit } from 'Containers/Project/MultiUnit';

import { selectedPropertyTypeSelector } from 'Containers/Project/selectors';
import { LocationsPlaceholder } from 'Containers/LocationsPlaceholder';
import { ADD_LOCATIONS, ALL_LOCATIONS, PHOTO_MANAGEMENT } from 'Utils/constants';
import { useHistory, useLocation } from 'react-router-dom';
import { MultiUnitList } from 'Containers/Project/Unit/MultiUnitList';
import { selectedMultiUnitSelector } from 'Containers/Project/Unit/selector';

const AllLocationsContainer = () => {
  const history = useHistory();
  const location = useLocation();

  const { pathname } = location;

  const propertyType: any = useSelector(selectedPropertyTypeSelector, areEqual);
  const selectedMultiUnit: any = useSelector(selectedMultiUnitSelector, areEqual);

  const onAddButtonClick = useCallback(() => {
    history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}`);
  }, []);

  const views = {
    singleUnit: <SingleUnit />,
    multiUnit: <MultiUnit />,
    multiUnitList: (
      <MultiUnitList unitName={selectedMultiUnit?.name} unitId={selectedMultiUnit?.id} type={selectedMultiUnit?.type} />
    ),
    noLocations: (
      <LocationsPlaceholder
        heading="No locations yet. Add a new location, or start adding photos."
        onTabClick={onAddButtonClick}
      />
    ),
  };

  const [tabView, setTabView]: any = useState(null);

  useEffect(() => {
    if (propertyType && propertyType === 1) {
      setTabView(views.singleUnit);
    } else if (
      propertyType &&
      propertyType === 2 &&
      pathname.includes(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}/multiUnitView`)
    ) {
      setTabView(views.multiUnitList);
    } else if (
      propertyType &&
      propertyType === 2 &&
      pathname.includes(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}`)
    ) {
      setTabView(views.multiUnit);
    } else {
      setTabView(views.noLocations);
    }
  }, [propertyType, pathname]);

  return tabView;
};

const AllLocationsContainerMemo = memo(AllLocationsContainer, areEqual);

export { AllLocationsContainerMemo as AllLocationsContainer };
