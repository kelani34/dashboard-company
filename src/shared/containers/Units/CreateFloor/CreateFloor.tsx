import React, { memo, useCallback, useEffect, useState } from 'react';
import { CreateFloor } from 'Components/Units/CreateFloor';
import { areEqual } from 'Utils/equalityChecks';
import { useDispatch, useSelector } from 'react-redux';
import { projectIdSelector } from 'Containers/Project/selectors';
import { setFloorType } from 'Containers/Projects';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import { useHistory } from 'react-router-dom';
import { ADD_LOCATIONS, MULTI_UNIT, PHOTO_MANAGEMENT } from 'Utils/constants';
import { setFloorCreated } from 'Containers/Project/Unit/actions';
import { listProjectPropertiesWithUnits } from 'Containers/Project/actions';

interface Props {
  isOpen: boolean;
}

const propertySelector = ({ project }) => {
  const value = project?.property;

  return value || {};
};

const floorCreatedSelector = ({ units }) => {
  const value = units?.floorCreated;

  return value || false;
};

const nameErrorSelector = ({ core }) => {
  const value = core?.formErrors?.name;

  return value || [];
};

const CreateFloorContainer = ({ isOpen }: Props) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [floorName, setFloorName] = useState('');
  const [isModelOpen, setIsModelOpen] = useState(false);

  const projectId = useSelector(projectIdSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const floorCreated = useSelector(floorCreatedSelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);

  // multi unit id, we have single and multi unit types. 1 for single unit and 2 for multi unit.
  // if the product decided to do a dynamic unit types, this needs a change
  const [propertyType] = useState(2);

  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
  };

  useEffect(() => {
    setIsModelOpen(isOpen);
  }, [isOpen]);

  const onFloorChange = useCallback((e: any) => {
    const { value } = e.target;

    setFloorName(value);
  }, []);

  const onFormButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const trimmedFloorName = floorName.trim();

      dispatch(setFloorType(projectId, trimmedFloorName, propertyType, property));
    },
    [floorName, property]
  );

  useEffect(() => {
    if (floorCreated) {
      setIsModelOpen(false);
    }
  }, [floorCreated]);

  useEffect(() => {
    if (!isModelOpen && floorCreated) {
      if (projectId) {
        dispatch(listProjectPropertiesWithUnits(projectId));
      }

      history.push(`/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}${MULTI_UNIT}/add`);
    }

    return () => {
      if (!isModelOpen && floorCreated) {
        dispatch(setFloorCreated(false));
      }
    };
  }, [projectId, isModelOpen, floorCreated]);

  return (
    <CreateFloor
      isOpen={isModelOpen}
      floorName={floorName}
      onFloorChange={onFloorChange}
      onFormButtonClick={onFormButtonClick}
      formErrors={errors}
      fetching={fetching}
    />
  );
};

const CreateFloorContainerMemo = memo(CreateFloorContainer, areEqual);

export { CreateFloorContainerMemo as CreateFloor };
