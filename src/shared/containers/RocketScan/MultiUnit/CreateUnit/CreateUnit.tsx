import React, { memo, useCallback, useEffect, useState } from 'react';
import { CreateUnitModal } from 'Components/RocketScan';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import { propertySelector, projectSelector, propertyTypesSelector } from 'Containers/RocketScan/selectors';
import { createLocation, createLocationForTempProperty } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { nameErrorSelector, floorErrorSelector } from '../Locations/selectors';

interface Props {
  isCommercialProperty?: boolean;
  isOpen: boolean;
  localLocationCreated: boolean;
  closeModal: (e: any) => void;
  setLocalLocationCreated: (e: any) => void;
}

const CreateUnitContainer = ({
  isCommercialProperty,
  isOpen,
  localLocationCreated,
  closeModal,
  setLocalLocationCreated,
}: Props) => {
  const dispatch = useDispatch();

  const [unitName, setUnitName] = useState('');
  const [floorNumber, setFloorNumber] = useState(0);
  const [isCommercial, setIsCommercial] = useState(false);
  const [isAccessible, setIsAccessible] = useState(false);
  const [hideDropDown, setHideDropDown] = useState(false);

  const fetching = useSelector(coreFetchingSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const project = useSelector(projectSelector, areEqual);
  const propertyTypes = useSelector(propertyTypesSelector, areEqual);

  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
    floor: useSelector(floorErrorSelector, areEqual),
  };

  const onUnitNameChange = useCallback((e: any) => {
    const { value } = e.target;

    setUnitName(value);
  }, []);

  const onCommercialCheckboxClick = useCallback((e: any) => {
    const { checked } = e.target;

    setIsCommercial(checked);
  }, []);

  const onAccessibleCheckboxClick = useCallback((e: any) => {
    const { checked } = e.target;

    setIsAccessible(checked);
  }, []);

  const onCreateUnitFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      let propertyTypeId = propertyTypes.find((type: any) => type.name === 'multiunit')?.id;
      if (isCommercialProperty) {
        propertyTypeId = propertyTypes.find((type: any) => type.name === 'commercial')?.id;
      }

      const projectId = project?.id;
      const propertyId = property?.id;

      setHideDropDown(true);

      if (property?.name === 'temp') {
        dispatch(
          createLocationForTempProperty(
            propertyTypeId,
            {
              location_type_id: 1, // unit
              name: unitName,
              floor_number: floorNumber,
              is_commercial: isCommercial,
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
              location_type_id: 1, // unit
              name: unitName,
              floor_number: floorNumber,
              is_commercial: isCommercial,
              is_accessible: !isAccessible,
            },
            propertyId,
            setLocalLocationCreated
          )
        );
      }
    },
    [project, property, propertyTypes, unitName, floorNumber, isCommercial, isCommercialProperty, isAccessible]
  );

  useEffect(() => {
    if (localLocationCreated) {
      setUnitName('');
      setIsCommercial(false);
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
    <CreateUnitModal
      isCommercialProperty={isCommercialProperty}
      isOpen={isOpen}
      title="Unit"
      unitName={unitName}
      floorNumber={floorNumber}
      isCommercial={isCommercial}
      isAccessible={isAccessible}
      onUnitNameChange={onUnitNameChange}
      onCommercialCheckboxClick={onCommercialCheckboxClick}
      onAccessibleCheckboxClick={onAccessibleCheckboxClick}
      onCreateUnitFormButtonClick={onCreateUnitFormButtonClick}
      formErrors={errors}
      fetching={fetching}
      hideDropDown={hideDropDown}
      closeModal={closeModal}
      setFloorNumber={setFloorNumber}
    />
  );
};

CreateUnitContainer.defaultProps = {
  isCommercialProperty: false,
};

const CreateUnitContainerMemo = memo(CreateUnitContainer, areEqual);

export { CreateUnitContainerMemo as CreateUnit };
