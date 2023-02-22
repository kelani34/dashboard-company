import React, { memo, useCallback, useEffect, useState } from 'react';
import { CreateUnit } from 'Components/Units/CreateUnit';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { projectIdSelector, propertyMultiSelector } from 'Containers/Project/selectors';
import { setUnitType } from 'Containers/Projects';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import { useHistory } from 'react-router-dom';
import { ADD_LOCATIONS, MULTI_UNIT, PHOTO_MANAGEMENT } from 'Utils/constants';
import { setUnitCreated } from 'Containers/Project/Unit/actions';
import { listProjectPropertiesWithUnits } from 'Containers/Project/actions';

interface Props {
  isOpen: boolean;
}

const unitCreatedSelector = ({ units }) => {
  const value = units?.unitCreated;

  return value || false;
};

const nameErrorSelector = ({ core }) => {
  const value = core?.formErrors?.name;

  return value || [];
};

const CreateUnitContainer = ({ isOpen }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [unitName, setUnitName] = useState('');
  const [checked, setChecked] = useState(false);
  const [isModelOpen, setIsModelOpen] = useState(false);

  const projectId = useSelector(projectIdSelector, areEqual);
  const property = useSelector(propertyMultiSelector, areEqual);
  const unitCreated = useSelector(unitCreatedSelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);

  // multi unit id, we have single and multi unit types. 1 for single unit and 2 for multi unit.
  // if the product decided to do a dynamic unit types, this needs a change
  const [unitType] = useState(2);

  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
  };

  useEffect(() => {
    setIsModelOpen(isOpen);
  }, [isOpen]);

  const onCheckboxClick = useCallback(() => {
    setChecked((prev) => !prev);
  }, []);

  const onUnitChange = useCallback((e: any) => {
    const { value } = e.target;

    setUnitName(value);
  }, []);

  const onFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const trimmedUnitName = unitName.trim();

      dispatch(setUnitType(projectId, trimmedUnitName, unitType, property));
    },
    [unitName, property]
  );

  useEffect(() => {
    if (unitCreated) {
      setIsModelOpen(false);
    }
  }, [unitCreated]);

  useEffect(() => {
    if (!isModelOpen && unitCreated) {
      if (projectId) {
        dispatch(listProjectPropertiesWithUnits(projectId));
      }

      history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}/add`);
    }
    return () => {
      if (!isModelOpen && unitCreated) {
        dispatch(setUnitCreated(false));
      }
    };
  }, [isModelOpen, unitCreated, projectId]);

  return (
    <CreateUnit
      isOpen={isModelOpen}
      checked={checked}
      unitName={unitName}
      onUnitChange={onUnitChange}
      onCheckboxClick={onCheckboxClick}
      onFormButtonClick={onFormButtonClick}
      formErrors={errors}
      fetching={fetching}
    />
  );
};

const CreateUnitContainerMemo = memo(CreateUnitContainer, areEqual);

export { CreateUnitContainerMemo as CreateUnit };
