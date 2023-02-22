import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { OptionsDropDown } from 'Containers/ProjectData';
import { dropdownSizes } from 'Components/DropDown';
import { TextBox } from 'Components/TextBox';
import { useDamagedMaterialFunctions } from 'Context/RocketScan';

import classes from './scopeOfWorkEdit.module.css';

interface Props {
  materialId: number;
  material?: any;
}

const ScopeOfWorkEditContainer = ({ materialId, material }: Props) => {
  const { unitOfMeasurementTypes, scopeActionTypes, isUploading, setIsUploading, updateScope }: any =
    useDamagedMaterialFunctions();

  const [quantity, setQuantity] = useState('0');
  const [unitOfMeasurementId, setUnitOfMeasurementId] = useState(undefined);
  const [scopeActionId, setScopeActionId] = useState(undefined);

  // set initial state
  useEffect(() => {
    if (material) {
      if (material.quantity) {
        setQuantity(material.quantity);
      }
      if (material.unit_of_measurement) {
        setUnitOfMeasurementId(material.unit_of_measurement);
      }
      if (material.action) {
        setScopeActionId(material.action);
      }
    }
  }, [material]);

  const onChangeQuantity = useCallback((e: any) => {
    setQuantity(e.target.value);
  }, []);

  const onChangeUnit = useCallback((id: any) => {
    setUnitOfMeasurementId(id);
  }, []);

  const onChangeAction = useCallback((id: any) => {
    setScopeActionId(id);
  }, []);

  useEffect(() => {
    if (isUploading) {
      setIsUploading(false);
      const quantitySelection = quantity === '0' ? null : quantity;
      const unitSelection = unitOfMeasurementId === 0 ? null : unitOfMeasurementId;
      const actionSelection = scopeActionId === 0 ? null : scopeActionId;
      updateScope(materialId, {
        quantity: quantitySelection,
        unit_of_measurement: unitSelection,
        action: actionSelection,
      });
    }
  }, [isUploading, quantity, unitOfMeasurementId, scopeActionId]);

  return (
    <div className={classes.container}>
      <TextBox
        name="quantity"
        type="number"
        ariaLabel="unit quantity"
        className={`${classes.count}`}
        placeholder="0"
        value={quantity}
        onChange={onChangeQuantity}
        autoComplete="off"
      />
      <OptionsDropDown
        className={classes.unitsDropdown}
        items={unitOfMeasurementTypes}
        placeHolder="unit"
        optionSelectedId={unitOfMeasurementId}
        setStatusSelected={onChangeUnit}
        size={dropdownSizes.small}
      />
      <OptionsDropDown
        className={classes.actionsDropdown}
        items={scopeActionTypes}
        placeHolder="action"
        optionSelectedId={scopeActionId}
        setStatusSelected={onChangeAction}
        size={dropdownSizes.small}
      />
    </div>
  );
};

ScopeOfWorkEditContainer.defaultProps = {
  material: undefined,
};

const ScopeOfWorkEditContainerMemo = memo(ScopeOfWorkEditContainer, areEqual);

export { ScopeOfWorkEditContainerMemo as ScopeOfWorkEdit };
