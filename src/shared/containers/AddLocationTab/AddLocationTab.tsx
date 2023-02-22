import React, { memo, useCallback, useEffect, useState } from 'react';

import { SingleUnitAdd } from 'Containers/SingleUnitAdd';
import { MultiUnitAdd } from 'Containers/MultiUnitAdd';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { setUnitType } from 'Containers/Projects';
import { useHistory, useLocation } from 'react-router-dom';
import { ADD_LOCATIONS, MULTI_UNIT, PHOTO_MANAGEMENT, SINGLE } from 'Utils/constants';
import { MultiUnitAddRoom } from 'Containers/Project/AddLocations/MultiUnitAddRoom';
import { setUnit } from 'Containers/Project/Unit/actions';
import { multiUnitSelector, singleUnitSelector } from 'Containers/Project/Unit/selector';
import { projectMultiSelector, propertyMultiSelector, propertySingleSelector } from 'Containers/Project/selectors';
import { ChoosePropertyType } from './ChoosePropertyType';
import { setSelectedUnitTypeUrl } from '.';

const AddLocationTabContainer = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { pathname } = location;

  const { selectedProjectId, projectStore } = useSelector(projectMultiSelector, areEqual);
  const singleUnit: any = useSelector(singleUnitSelector, areEqual);
  const multiUnit: any = useSelector(multiUnitSelector, areEqual);
  const property: any = useSelector(propertySingleSelector, areEqual);
  const propertyMulti: any = useSelector(propertyMultiSelector, areEqual);

  const [unitType] = useState({
    singleUnit: 1,
    multiUnit: 2,
  });
  const [singleUnitExists, setSingleUnitExists] = useState(false);
  const [multiUnitExists, setMultiUnitExists] = useState(false);

  // TODO::replace these with redux
  useEffect(() => {
    const { id: singlUnitId } = singleUnit;
    const { id: multiUnitId } = multiUnit ?? '';
    const { id: propertyId } = property;
    const { id: propertyMultiId } = propertyMulti;

    // single unit exist check
    const exists = Number.isSafeInteger(singlUnitId) && Number.isSafeInteger(propertyId);
    setSingleUnitExists(exists);

    // Dispatch
    if (exists) {
      dispatch(setUnit(property, singleUnit, selectedProjectId));
    }

    // multi unit exist check
    const existsMulti = Number.isSafeInteger(multiUnitId) && Number.isSafeInteger(propertyMultiId);
    setMultiUnitExists(existsMulti);
  }, [singleUnit, multiUnit, propertyMulti, property]);

  const addSingleUnit = useCallback(() => {
    // Creat a unit here.

    // Create the property adn Unit, based on the selected location type
    const projectAddress = projectStore.find((elem: any) => elem.id.toString() === selectedProjectId);

    // we'll create single unit once, we'll skip if the user already has a single unit
    if (!singleUnitExists) {
      dispatch(setUnitType(selectedProjectId, projectAddress?.address?.address, unitType.singleUnit));
    }

    history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${SINGLE}`);
    dispatch(setSelectedUnitTypeUrl('singleUnit'));
  }, [projectStore, selectedProjectId, singleUnitExists]);

  const addMultiUnit = useCallback(() => {
    history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}`);
    dispatch(setSelectedUnitTypeUrl('multiUnit'));
  }, []);

  const view = {
    mainView: <ChoosePropertyType onSingleUnitTileClick={addSingleUnit} onMultiUnitTileClick={addMultiUnit} />,
    singleUnitAddView: <SingleUnitAdd />,
    multiUnitAddView: <MultiUnitAdd />,
    multiUnitAddRoomView: <MultiUnitAddRoom />,
  };

  const [tabView, setTabView] = useState(view.mainView);

  useEffect(() => {
    if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${SINGLE}`)) {
      setTabView(view.singleUnitAddView);
    } else if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}/add`)) {
      setTabView(view.multiUnitAddRoomView);
    } else if (pathname.includes(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}`)) {
      setTabView(view.multiUnitAddView);
    } else if (!singleUnitExists && !multiUnitExists) {
      setTabView(view.mainView);
    }
  }, [pathname]);

  return tabView;
};

const AddLocationTabContainerMemo = memo(AddLocationTabContainer, areEqual);

export { AddLocationTabContainerMemo as AddLocationTab };
