import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { AffectedLocationModal } from 'Components/ProjectData';
import { affectedLocationRoomsSelector, locationDamageTypesSelector } from 'Containers/ProjectData/LossData/selectors';

import {
  listRoomsForLossData,
  updateAffectedLocation,
  updateRoomSourceStatus,
  updateCauseOfDamage,
  listLocationDamageTypes,
  syncLocationDamageTypes,
} from 'Containers/ProjectData/LossData/actions';
import { useLossDataFunctions } from 'Context/LossData';
import { damageSourceOptions } from './options';

interface Props {
  location: any;
  isOpen: boolean;
  setIsOpen: (e: any) => void;
  onCloseClick: (e: any) => void;
}

const AffectedLocationModalContainer = ({ location, isOpen, setIsOpen, onCloseClick }: Props) => {
  const dispatch = useDispatch();
  const {
    property,
    selectedDamageTypes: propertyDamageTypes,
    asbestosStatuses,
    projectDamageCauses,
    selectedDamageCause,
  }: any = useLossDataFunctions();

  const [unitIsDamageSource, setUnitIsDamageSource] = useState(undefined);
  const [damageSourceInput, setDamageSourceInput] = useState(undefined);

  const [asbestosStatus, setAsbestosStatus] = useState(undefined);
  const [locationId, setLocationId] = useState(undefined);
  const [sourceRoomId, setSourceRoomId] = useState(undefined);
  const [damageCauseOptions, setDamageCauseOptions] = useState(undefined);
  const [damageCauseId, setDamageCauseId] = useState(undefined);

  const [selectedLocationDamageTypes, setSelectedLocationDamageTypes] = useState([]);

  const sourceRoomOptions = useSelector(affectedLocationRoomsSelector, areEqual);

  const locationDamageTypes = useSelector(locationDamageTypesSelector, areEqual);

  // fetch and set is source and source room selection
  useEffect(() => {
    if (location?.id) {
      const { id, is_source: isSource, asbestos_status: asbestosStatus } = location;
      if (id !== locationId) {
        // reset values and get room list when switching locations
        setUnitIsDamageSource(undefined);
        setSourceRoomId(undefined);
        setAsbestosStatus(undefined);
        setSelectedLocationDamageTypes([]);

        setLocationId(id);
        dispatch(listRoomsForLossData(id));
        dispatch(listLocationDamageTypes(id));
      }

      // set damage source toolbar selection
      setDamageSourceInput(isSource ? 1 : 2);
      setUnitIsDamageSource(isSource);

      // set asbestos dropdown selection
      if (asbestosStatus?.id) {
        setAsbestosStatus(asbestosStatus.id);
      }
    }
  }, [location]);

  useEffect(() => {
    const ids = new Set(propertyDamageTypes.map((type) => type.id));
    const filtered = locationDamageTypes.filter((type) => ids.has(type.id));
    setSelectedLocationDamageTypes(filtered);
  }, [locationDamageTypes, propertyDamageTypes]);

  // set source damage room selection
  useEffect(() => {
    if (location?.source_room && sourceRoomOptions?.length > 0) {
      const { source_room: sourceRoom } = location;
      if (sourceRoom?.id) {
        setSourceRoomId(sourceRoom.id);
      }
    }
  }, [location, sourceRoomOptions]);

  // set cause of damage selection
  useEffect(() => {
    if (damageCauseOptions?.length > 0 && selectedDamageCause?.id) {
      setDamageCauseId(selectedDamageCause.id);
    }
  }, [selectedDamageCause, damageCauseOptions]);

  // set damage cause dropdown options
  useEffect(() => {
    const ids = new Set(selectedLocationDamageTypes.map((type) => type.id));
    const filtered = projectDamageCauses.filter((cause) => ids.has(cause.property_damage_type.id));
    setDamageCauseOptions(filtered);
  }, [projectDamageCauses, selectedLocationDamageTypes]);

  // conversion for the damage source toolbar selection and value
  useEffect(() => {
    setUnitIsDamageSource(damageSourceInput === 1);
  }, [damageSourceInput]);

  const onFormSubmit = useCallback(() => {
    // update unit source status
    if (location?.id && property?.id && location.location_type) {
      const {
        name,
        floor_number: floorNumber,
        location_type: { id: locationTypeId },
        is_common: isCommon,
        is_accessible: isAccessible,
        is_commercial: isCommercial,
      } = location;

      const requestData: any = {
        name,
        floor_number: floorNumber,
        property_id: property.id,
        location_type_id: locationTypeId,
        is_common: isCommon,
        is_accessible: isAccessible,
        is_commercial: isCommercial,
      };

      requestData.is_source = unitIsDamageSource;

      if (unitIsDamageSource && sourceRoomId) {
        // unit is damage source, update source room and cause of damage (if changed)
        if (damageCauseId && damageCauseId !== selectedDamageCause?.id) {
          dispatch(updateCauseOfDamage(property.id, damageCauseId));
        }

        // update source room
        dispatch(updateRoomSourceStatus(sourceRoomId, true));
      }

      if (asbestosStatus) {
        requestData.asbestos_status_id = asbestosStatus;
      }

      dispatch(updateAffectedLocation(location.id, requestData));

      // update damage types
      const selectedDamageTypeIds = selectedLocationDamageTypes
        .map((damageType: any) => damageType.id.toString())
        .sort();
      dispatch(syncLocationDamageTypes(location.id, { property_damage_type_ids: selectedDamageTypeIds }));

      setIsOpen(false);
    }
  }, [
    location,
    property,
    sourceRoomId,
    unitIsDamageSource,
    asbestosStatus,
    damageCauseId,
    selectedDamageCause,
    selectedLocationDamageTypes,
  ]);

  return (
    <AffectedLocationModal
      unitName={location?.name}
      isOpen={isOpen}
      selectedDamageTypes={selectedLocationDamageTypes}
      propertyDamageTypes={propertyDamageTypes}
      setLocationDamageTypes={setSelectedLocationDamageTypes}
      unitIsDamageSource={damageSourceInput}
      setUnitIsDamageSource={setDamageSourceInput}
      damageSourceOptions={damageSourceOptions}
      isButtonEnabled={sourceRoomId || !unitIsDamageSource}
      sourceRoomOptions={sourceRoomOptions}
      sourceRoomInput={sourceRoomId}
      damageCauseOptions={damageCauseOptions}
      damageCauseInput={damageCauseId}
      asbestosStatusOptions={asbestosStatuses}
      asbestosStatusInput={asbestosStatus}
      setSourceRoomInput={setSourceRoomId}
      setDamageCauseInput={setDamageCauseId}
      setAsbestosStatusInput={setAsbestosStatus}
      onFormSubmit={onFormSubmit}
      onCloseClick={onCloseClick}
    />
  );
};

const AffectedLocationModalContainerMemo = memo(AffectedLocationModalContainer, areEqual);

export { AffectedLocationModalContainerMemo as AffectedLocationModal };
