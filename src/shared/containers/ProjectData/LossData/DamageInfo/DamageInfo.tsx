import React, { memo, useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { compareArrays, formatDate } from 'Utils/helpers';

import {
  syncPropertyDamageTypes,
  updatePropertyLossData,
  createPropertyWithLossData,
} from 'Containers/ProjectData/LossData/actions';

import { DamageInfoEdit, DamageInfoView } from 'Components/ProjectData';
import { useLossDataFunctions } from 'Context/LossData';

const DamageInfoContainer = () => {
  const dispatch = useDispatch();
  const {
    isEditing,
    setIsEditing,
    project,
    property,
    propertyDamageTypes,
    selectedDamageTypes,
    selectedDamageCause,
    selectedDamageCauseId,
    selectedDamageCategory,
    selectedLossDate,
    onEditButtonClick,
  }: any = useLossDataFunctions();

  const [showCategorySection, setShowCategorySection] = useState(false);
  const [formattedDate, setFormattedDate] = useState(undefined);

  useEffect(() => {
    if (selectedDamageTypes) {
      // only show category selector when damage type is water
      setShowCategorySection(selectedDamageTypes.some((type) => type.name === 'Water'));
    }
  }, [selectedDamageTypes]);

  useEffect(() => {
    if (selectedLossDate) {
      setFormattedDate(formatDate(selectedLossDate, 'PP'));
    } else {
      setFormattedDate(undefined);
    }
  }, [selectedLossDate]);

  const onSaveButtonClick = useCallback(() => {
    setIsEditing(false);

    const formattedLossDate = selectedLossDate ? formatDate(selectedLossDate, "yyyy-MM-dd'T'HH:mm:ssxxx") : '';

    if (property?.id) {
      const previousDamageTypeIds = propertyDamageTypes.map((damageType: any) => damageType.id.toString()).sort();
      const selectedDamageTypeIds = selectedDamageTypes.map((damageType: any) => damageType.id.toString()).sort();
      if (!compareArrays(previousDamageTypeIds, selectedDamageTypeIds)) {
        dispatch(syncPropertyDamageTypes(property.id, { property_damage_type_ids: selectedDamageTypeIds }));
      }

      dispatch(updatePropertyLossData(property.id, selectedDamageCauseId, selectedDamageCategory, formattedLossDate));
    } else if (project?.id) {
      // haven't selected a property type yet, so create a temp property
      const selectedDamageTypeIds = selectedDamageTypes.map((damageType: any) => damageType.id.toString());
      dispatch(
        createPropertyWithLossData(
          project.id,
          { property_damage_type_ids: selectedDamageTypeIds },
          selectedDamageCauseId,
          selectedDamageCategory,
          formattedLossDate
        )
      );
    }
  }, [
    property,
    project,
    isEditing,
    selectedDamageTypes,
    selectedDamageCauseId,
    selectedDamageCategory,
    selectedLossDate,
  ]);

  return isEditing ? (
    <DamageInfoEdit
      showCategorySection={showCategorySection}
      onEditButtonClick={onEditButtonClick}
      onSaveButtonClick={onSaveButtonClick}
    />
  ) : (
    <DamageInfoView
      damageCauseName={selectedDamageCause?.name}
      showCategorySection={showCategorySection}
      selectedCategory={selectedDamageCategory}
      lossDate={formattedDate}
    />
  );
};

const DamageInfoContainerMemo = memo(DamageInfoContainer, areEqual);

export { DamageInfoContainerMemo as DamageInfo };
