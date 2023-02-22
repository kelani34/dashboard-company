import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { CustomDamageTypeModal } from 'Components/ProjectData';
import { useLossDataFunctions } from 'Context/LossData';
import {
  createCustomDamageType,
  setCustomDamageTypeCreated,
  listProjectDamageTypes,
} from 'Containers/ProjectData/LossData/actions';
import { customDamageTypeCreatedSelector, nameErrorSelector } from 'Containers/ProjectData/LossData/selectors';

const CustomDamageTypeModalContainer = () => {
  const dispatch = useDispatch();

  const { project, isCustomDamageTypeModalOpen, setIsCustomDamageTypeModalOpen }: any = useLossDataFunctions();

  // local variables
  const [damageTypeName, setDamageTypeName] = useState('');
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);

  // selectors
  const customDamagedTypeCreated = useSelector(customDamageTypeCreatedSelector, areEqual);

  // api errors
  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
  };

  const onCloseClick = useCallback(() => {
    setIsCustomDamageTypeModalOpen(false);
  }, []);

  const onNameChange = useCallback(({ target: { value } }: any) => {
    setDamageTypeName(value);
    setIsButtonEnabled(value.length === 0);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      // api call
      if (project?.id) {
        dispatch(createCustomDamageType(project.id, { name: damageTypeName }));
      }
    },
    [project, damageTypeName]
  );

  useEffect(() => {
    if (customDamagedTypeCreated && project?.id) {
      setDamageTypeName('');

      dispatch(listProjectDamageTypes(project.id));
      dispatch(setCustomDamageTypeCreated(false));
      setIsCustomDamageTypeModalOpen(false);
    }
  }, [customDamagedTypeCreated, project]);

  return (
    <CustomDamageTypeModal
      typeName={damageTypeName}
      isOpen={isCustomDamageTypeModalOpen}
      errors={errors}
      isButtonEnabled={isButtonEnabled}
      onFormSubmit={onFormSubmit}
      onCloseClick={onCloseClick}
      onTypeNameChange={onNameChange}
    />
  );
};

const CustomDamageTypeModalContainerMemo = memo(CustomDamageTypeModalContainer, areEqual);
export { CustomDamageTypeModalContainerMemo as CustomDamageTypeModal };
