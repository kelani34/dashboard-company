import React, { memo, useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectIdSelector } from 'Containers/RocketScan/selectors';

import { AddCustomForm } from 'Components/RocketScan';

import formClasses from 'Themes/form/form.module.css';
import { customDamagedMaterialCreatedSelector } from '../selectors';
import { createCustomDamagedMaterial, setCustomDamagedMaterialCreated } from '../actions';
import classes from './createCustomDamagedMaterial.module.css';

interface Props {
  damageMaterialId: number;
}

const CreateCustomDamagedMaterialContainer = ({ damageMaterialId }: Props) => {
  const dispatch = useDispatch();

  // selectors
  const projectId = useSelector(projectIdSelector, areEqual);
  const [fetching, setFetching] = useState(false);
  const customDamagedMaterialCreated = useSelector(customDamagedMaterialCreatedSelector, areEqual);

  // local variables
  const [damageMaterialName, setDamageMaterialName] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);
  const [errors, setErrors] = useState({ name: [] });

  // set errors on individual component
  const setErrorsCallback = useCallback((errors: any) => {
    if (errors?.name) {
      setErrors(errors);
    } else {
      setErrors({ name: [] });
    }
  }, []);

  const onNameChange = useCallback(({ target: { value } }: any) => {
    setDamageMaterialName(value);
    setIsButtonEnable(value.length === 0);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      // api call
      dispatch(
        createCustomDamagedMaterial(
          projectId,
          { name: damageMaterialName, damage_type_id: damageMaterialId },
          setFetching,
          setErrorsCallback
        )
      );
    },
    [projectId, damageMaterialName, fetching]
  );

  useEffect(() => {
    if (customDamagedMaterialCreated) {
      setDamageMaterialName('');
      dispatch(setCustomDamagedMaterialCreated(false));
    }
  }, [customDamagedMaterialCreated]);

  return (
    <div className={`${classes.formContainer} ${errors.name.length > 0 ? classes.errorBackground : ''}`}>
      <AddCustomForm
        name={damageMaterialName}
        placeholderText="Add a New Material"
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

const CreateCustomDamagedMaterialContainerMemo = memo(CreateCustomDamagedMaterialContainer, areEqual);

export { CreateCustomDamagedMaterialContainerMemo as CreateCustomDamagedMaterial };
