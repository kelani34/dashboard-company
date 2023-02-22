import React, { memo, useCallback, useEffect, useState } from 'react';
import { CreateFloorModal } from 'Components/RocketScan';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import { propertySelector, projectSelector, propertyTypesSelector } from 'Containers/RocketScan/selectors';
import { createLocation, createLocationForTempProperty } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { nameErrorSelector, floorErrorSelector } from '../Locations/selectors';

interface Props {
  isOpen: boolean;
  localLocationCreated: boolean;
  closeModal: (e: any) => void;
  setLocalLocationCreated: (e: any) => void;
}

const CreateFloorContainer = ({ isOpen, localLocationCreated, closeModal, setLocalLocationCreated }: Props) => {
  const dispatch = useDispatch();

  const [floorName, setFloorName] = useState('');
  const [floorNumber, setFloorNumber] = useState(0);
  const [hideDropDown, setHideDropDown] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);

  const fetching = useSelector(coreFetchingSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const project = useSelector(projectSelector, areEqual);
  const propertyType = useSelector(propertyTypesSelector, areEqual);

  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
    floor: useSelector(floorErrorSelector, areEqual),
  };

  const onFloorNameChange = useCallback((e: any) => {
    const { value } = e.target;

    setFloorName(value);
  }, []);

  const onAccessibleCheckboxClick = useCallback((e: any) => {
    const { checked } = e.target;

    setIsAccessible(checked);
  }, []);

  const onCreateFloorFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const propertyTypeId = propertyType.find((type: any) => type.name === 'multiunit')?.id;

      const projectId = project?.id;
      const propertyId = property?.id;

      setHideDropDown(true);

      if (property?.name === 'temp') {
        dispatch(
          createLocationForTempProperty(
            propertyTypeId,
            {
              location_type_id: 2, // floor
              name: floorName,
              floor_number: floorNumber,
              is_commercial: false,
              is_accessible: !isAccessible,
            },
            propertyId,
            {},
            setLocalLocationCreated
          )
        );
      } else {
        dispatch(
          createLocation(
            projectId,
            propertyTypeId,
            {
              location_type_id: 2, // floor
              name: floorName,
              floor_number: floorNumber,
              is_commercial: false,
              is_accessible: !isAccessible,
            },
            propertyId,
            setLocalLocationCreated
          )
        );
      }
    },
    [project, propertyType, floorName, floorNumber, isAccessible]
  );

  useEffect(() => {
    if (localLocationCreated) {
      setFloorName('');
      setIsAccessible(false);
    }

    return () => {
      if (localLocationCreated) {
        setLocalLocationCreated(false);
      }
    };
  }, [localLocationCreated]);

  useEffect(() => {
    if (hideDropDown) {
      setHideDropDown(false);
    }
  }, [hideDropDown]);

  return (
    <CreateFloorModal
      isOpen={isOpen}
      title="Floor / Common Area"
      floorName={floorName}
      floorNumber={floorNumber}
      onFloorNameChange={onFloorNameChange}
      isAccessible={isAccessible}
      onAccessibleCheckboxClick={onAccessibleCheckboxClick}
      onCreateFloorFormButtonClick={onCreateFloorFormButtonClick}
      formErrors={errors}
      fetching={fetching}
      hideDropDown={hideDropDown}
      closeModal={closeModal}
      setFloorNumber={setFloorNumber}
    />
  );
};

const CreateFloorContainerMemo = memo(CreateFloorContainer, areEqual);

export { CreateFloorContainerMemo as CreateFloor };
