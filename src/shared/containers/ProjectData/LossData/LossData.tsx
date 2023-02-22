import React, { memo, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import {
  listProjectDamageTypes,
  listLocationsForProjectData,
  setPropertyLocations,
  listPropertyDamageTypes,
  setPropertyDamageTypes,
  setPropertyLossDataUpdated,
  listProjectDamageCauses,
  setAffectedLocationUpdated,
} from 'Containers/ProjectData/LossData/actions';

import { getPropertyData } from 'Containers/ProjectData/PropertyData/actions';

import { useLossDataFunctions } from 'Context/LossData';

import { LossData } from 'Components/ProjectData';

import { parseISODate } from 'Utils/helpers';

const LossDataContainer = () => {
  const dispatch = useDispatch();
  const {
    projectId,
    property,
    locations,
    propertyDamageTypes,
    projectDamageCauses,
    onEditButtonClick,
    setSelectedDamageCause,
    setSelectedDamageCategory,
    setSelectedLossDate,
    propertyLossDataUpdated,
    affectedLocationUpdated,
  }: any = useLossDataFunctions();

  // local variables
  const [propertyId, setPropertyId] = useState(undefined);
  const [initialDamageCauseFetched, setInitialDamageCauseFetched] = useState(false);

  // load project damage types
  useEffect(() => {
    if (projectId) {
      dispatch(listProjectDamageTypes(projectId));
    }
  }, [projectId]);

  // load the property damage types that applies to this project, as well as list of locations
  useEffect(() => {
    if (property?.id) {
      const { id, damageCause, damageCategory, lossDate } = property;
      if (id !== propertyId) {
        // get property locations and damage types when changing property
        setPropertyId(id);
        dispatch(listLocationsForProjectData(id));
        dispatch(listPropertyDamageTypes(id));
      }
      setSelectedDamageCause(damageCause);
      setSelectedDamageCategory(damageCategory);
      // date picker needs a Date object but the value is stored as a string
      if (lossDate) {
        setSelectedLossDate(parseISODate(lossDate));
      }
    } else {
      setPropertyId(undefined);
      setSelectedDamageCause(undefined);
      setSelectedDamageCategory(undefined);
      setSelectedLossDate(undefined);
      dispatch(setPropertyDamageTypes([]));
      dispatch(setPropertyLocations([]));
      // dispatch(resetLossData());
    }
  }, [property]);

  // refetch property data after update
  useEffect(() => {
    if (propertyId && propertyLossDataUpdated) {
      dispatch(getPropertyData(propertyId));
      dispatch(setPropertyLossDataUpdated(false));
    }
  }, [propertyId, propertyLossDataUpdated]);

  // refetch property data after update
  useEffect(() => {
    if (!propertyId && (propertyDamageTypes.length > 0 || locations.length > 0)) {
      dispatch(setPropertyDamageTypes([]));
      dispatch(setPropertyLocations([]));
    }
  }, [propertyId, propertyDamageTypes, locations]);

  // refetch locations after updating affected locations
  useEffect(() => {
    if (propertyId && affectedLocationUpdated) {
      dispatch(listLocationsForProjectData(propertyId));
      dispatch(setAffectedLocationUpdated(false));
    }
  }, [propertyId, affectedLocationUpdated]);

  // load damage causes on initial load
  useEffect(() => {
    if (
      projectId &&
      projectDamageCauses.length === 0 &&
      propertyDamageTypes.length !== 0 &&
      !initialDamageCauseFetched
    ) {
      const propertyDamageTypeIds = propertyDamageTypes.map((type) => type.id).toString();
      dispatch(listProjectDamageCauses(projectId, propertyDamageTypeIds));
      setInitialDamageCauseFetched(true);
    }
  }, [projectId, projectDamageCauses, propertyDamageTypes, initialDamageCauseFetched]);

  return <LossData onEditButtonClick={onEditButtonClick} />;
};

const LossDataContainerMemo = memo(LossDataContainer, areEqual);

export { LossDataContainerMemo as LossData };
