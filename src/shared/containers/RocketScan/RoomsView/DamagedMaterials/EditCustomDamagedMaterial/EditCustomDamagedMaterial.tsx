import React, { memo, useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { AddCustomForm } from 'Components/RocketScan';
import { DamagedMaterialListItem } from 'Containers/RocketScan';

import { useDamagedMaterialFunctions } from 'Context/RocketScan';

import formClasses from 'Themes/form/form.module.css';
import { updateCustomDamagedMaterial, deleteCustomDamagedMaterial } from '../actions';

import classes from './editCustomDamagedMaterial.module.css';

interface Props {
  material: any;
}

const EditCustomDamagedMaterialContainer = ({ material }: Props) => {
  const dispatch = useDispatch();

  const { id, name } = material;

  const { selectedMaterials, onDamagedListItemClick }: any = useDamagedMaterialFunctions();

  // local state
  const [materialName, setMaterialName] = useState(name);
  const [isButtonEnable, setIsButtonEnable] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [canDelete, setCanDelete] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [errors, setErrors] = useState({ name: [], damage_material: [] });

  // set errors on individual component
  const setErrorsCallback = useCallback((errors: any) => {
    if (errors?.name || errors?.damage_material) {
      setErrors(errors);
    } else {
      setErrors({ name: [], damage_material: [] });
    }
  }, []);

  const onClickCheckbox = useCallback(() => {
    onDamagedListItemClick(material);
  }, [onDamagedListItemClick]);

  const onClickEditIcon = useCallback(() => {
    setIsEditable(true);
  }, []);

  const onNameChange = useCallback(({ target: { value } }) => {
    setMaterialName(value);
    setIsButtonEnable(value.length === 0);
  }, []);

  // disable edit mode after edit an item
  const disableEditMode = useCallback(() => {
    setIsEditable(false);
  }, []);

  // update checkbox icon
  useEffect(() => {
    setIsSelected(selectedMaterials.some((mat: any) => mat.id === id));
  }, [selectedMaterials]);

  // only allow delete when material isn't selected
  useEffect(() => {
    setCanDelete(!isSelected);
  }, [isSelected]);

  const onDeleteButtonClick = useCallback((e: any) => {
    e.preventDefault();
    dispatch(deleteCustomDamagedMaterial(id, setErrorsCallback));
  }, []);

  // form submit to update custom damaged material
  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      // api call
      dispatch(
        updateCustomDamagedMaterial(id, { name: materialName }, disableEditMode, setFetching, setErrorsCallback)
      );
    },
    [id, materialName, fetching]
  );

  return isEditable ? (
    <div
      className={`${isEditable ? classes.editing : ''} ${
        errors.name?.length || errors.damage_material?.length ? classes.errorBackground : ''
      }`}
    >
      <span className={classes.rowContainer}>
        <Icon className={classes.checkboxIcon} type={isSelected ? 'checkbox' : 'square'} onClick={onClickCheckbox} />
        <AddCustomForm
          name={materialName}
          placeholderText="Edit Material Name"
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
      </span>
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${
          errors.name?.length || errors.damage_material?.length ? 'd-block' : ''
        } ${classes.errorMessages}`}
      >
        {errors?.name?.[0]}
        {errors?.damage_material?.[0]}
      </div>
    </div>
  ) : (
    <div className={classes.rowContainer}>
      <DamagedMaterialListItem key={material.id} material={material} />
      <Icon className={classes.editIcon} type="editsm" onClick={onClickEditIcon} />
    </div>
  );
};

const EditCustomDamagedMaterialContainerMemo = memo(EditCustomDamagedMaterialContainer, areEqual);

export { EditCustomDamagedMaterialContainerMemo as EditCustomDamagedMaterial };
