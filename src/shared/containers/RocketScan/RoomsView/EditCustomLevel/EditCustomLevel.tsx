import React, { memo, useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { AddCustomForm } from 'Components/RocketScan';
import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';

import { coreFetchingSelector } from 'Containers/Core/selectors';
import { propertySelector } from 'Containers/RocketScan/selectors';
import { updateCustomLevel, deleteCustomLevel } from 'Containers/RocketScan/RoomsView/CreateCustomLevel/actions';

import formClasses from 'Themes/form/form.module.css';
import { nameErrorSelector, levelErrorSelector } from './selectors';
import classes from './editCustomLevel.module.css';

interface Props {
  id: number;
  levelName: string;
  canDelete: boolean;
  className?: string;
  onClick?: (e: any) => void;
}

const EditCustomLevelContainer = ({ id, levelName, canDelete, className, onClick }: Props) => {
  const dispatch = useDispatch();

  // selectors
  const property = useSelector(propertySelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);

  // local variables
  const [name, setName] = useState(levelName);
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);

  // api errors
  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
    level: useSelector(levelErrorSelector, areEqual),
  };

  const onClickEditIcon = useCallback(() => {
    setIsEditable(true);
  }, []);

  const onNameChange = useCallback(({ target: { value } }) => {
    setName(value);
    setIsButtonEnable(value.length === 0);
  }, []);

  // disable edit mode after edit an item
  const disableEditMode = useCallback(() => {
    setIsEditable(false);
  }, []);

  const onChangeLevel = useCallback((e: any) => {
    e.preventDefault();
    onClick(e);
  }, []);

  // delete custom room
  const onDeleteButtonClick = useCallback(() => {
    dispatch(deleteCustomLevel(id));
  }, []);

  // form submit to update custom room
  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      // api call
      dispatch(updateCustomLevel(id, { name }, disableEditMode));
    },
    [id, name, property]
  );

  return isEditable ? (
    <div
      className={`${isEditable ? classes.editing : ''} ${
        errors.name.length || errors.level.length ? classes.errorBackground : ''
      }`}
    >
      <AddCustomForm
        name={name}
        isLevel
        placeholderText="Edit Custom Level"
        deleteIcon={canDelete ? 'trashsm' : 'trashsmdisabled'}
        saveIcon={isEditable ? 'confirmsm' : 'addbuttonsm'}
        formErrors={errors}
        isEditable={isEditable}
        canDelete={canDelete}
        isButtonEnable={isButtonEnable}
        fetching={fetching}
        onNameChange={onNameChange}
        onDeleteButtonClick={onDeleteButtonClick}
        onSubmit={onFormSubmit}
      />
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
          errors.name.length || errors.level.length ? 'd-block' : ''
        } ${classes.errorMessages}`}
      >
        {errors?.name?.[0]}
        {errors?.level?.[0]}
      </div>
    </div>
  ) : (
    <div className={`${classes.editLevelContent}`}>
      <Button id={id.toString()} className={className} onClick={onChangeLevel}>
        <span className={classes.customLevelLabel}>{levelName}</span>
      </Button>
      <Icon className={classes.editIcon} type="editsm" onClick={onClickEditIcon} />
    </div>
  );
};
EditCustomLevelContainer.defaultProps = {
  className: undefined,
  onClick: undefined,
};
const EditCustomLevelContainerMemo = memo(EditCustomLevelContainer, areEqual);

export { EditCustomLevelContainerMemo as EditCustomLevel };
