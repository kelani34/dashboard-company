import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { AddCustomForm } from 'Components/RocketScan';

import { coreFetchingSelector } from 'Containers/Core/selectors';
import { propertySelector } from 'Containers/RocketScan/selectors';
import formClasses from 'Themes/form/form.module.css';
import { customLevelCreatedSelector, nameErrorSelector } from './selectors';
import { createCustomLevel } from './actions';

import classes from './createCustomLevel.module.css';
import { setCustomRoomCreated } from '../CreateCustomRoom/actions';

interface Props {
  roomType: string;
}

const CreateCustomLevelContainer = ({ roomType }: Props) => {
  const dispatch = useDispatch();

  // selectors
  const property = useSelector(propertySelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);
  const customLevelCreated = useSelector(customLevelCreatedSelector, areEqual);

  // local variables
  const [name, setName] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);

  // api errors
  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
  };

  const onNameChange = useCallback(({ target: { value } }: any) => {
    setName(value);
    setIsButtonEnable(value.length === 0);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      // api call
      dispatch(
        createCustomLevel(property?.id, { name, type: roomType.includes('external') ? 'external' : 'internal' })
      );
    },
    [property, name]
  );

  useEffect(() => {
    if (customLevelCreated) {
      setName('');
      dispatch(setCustomRoomCreated(false));
    }
  }, [customLevelCreated]);

  return (
    <div className={`${classes.formContainer} ${errors.name.length > 0 ? classes.errorBackground : ''}`}>
      <AddCustomForm
        name={name}
        isLevel
        placeholderText="Add Custom Level"
        deleteIcon="trashsm"
        saveIcon="addbuttonsm"
        formErrors={errors}
        isButtonEnable={isButtonEnable}
        fetching={fetching}
        onNameChange={onNameChange}
        onSubmit={onFormSubmit}
      />
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${errors.name.length ? 'd-block' : ''} ${
          classes.errorMessages
        }`}
      >
        {errors?.name?.[0]}
      </div>
    </div>
  );
};

const CreateCustomLevelContainerMemo = memo(CreateCustomLevelContainer, areEqual);

export { CreateCustomLevelContainerMemo as CreateCustomLevel };
