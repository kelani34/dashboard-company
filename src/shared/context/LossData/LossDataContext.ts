import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectSelector } from 'Containers/RocketScan/selectors';
import {
  projectDamageTypesSelector,
  propertyLocationsSelector,
  propertyDamageTypesSelector,
  projectDamageCausesSelector,
  propertyLossDataUpdatedSelector,
  affectedLocationUpdatedSelector,
} from 'Containers/ProjectData/LossData/selectors';
import { propertyDataSelector, asbestosStatusesSelector } from 'Containers/ProjectData/PropertyData/selectors';

export const LossDataContext = createContext({});

export const LossDataFunctions = () => {
  // local state
  const [projectId, setProjectId] = useState(undefined);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedDamageTypes, setSelectedDamageTypes] = useState([]);
  const [selectedDamageCause, setSelectedDamageCause] = useState(undefined);
  const [selectedDamageCauseId, setSelectedDamageCauseId] = useState(undefined);
  const [selectedDamageCategory, setSelectedDamageCategory] = useState(undefined);
  const [selectedLossDate, setSelectedLossDate] = useState(undefined);
  const [isCustomDamageTypeModalOpen, setIsCustomDamageTypeModalOpen] = useState(false);

  // selectors
  const project = useSelector(projectSelector, areEqual);
  const property = useSelector(propertyDataSelector, areEqual);
  const locations = useSelector(propertyLocationsSelector, areEqual);
  const projectDamageTypes = useSelector(projectDamageTypesSelector, areEqual);
  const propertyDamageTypes = useSelector(propertyDamageTypesSelector, areEqual);
  const projectDamageCauses = useSelector(projectDamageCausesSelector, areEqual);
  const propertyLossDataUpdated = useSelector(propertyLossDataUpdatedSelector, areEqual);
  const asbestosStatuses = useSelector(asbestosStatusesSelector, areEqual);
  const affectedLocationUpdated = useSelector(affectedLocationUpdatedSelector, areEqual);

  const onEditButtonClick = useCallback(() => {
    setIsEditing((prev) => !prev);
  }, [isEditing]);

  // update selected damage types after syncing
  useEffect(() => {
    setSelectedDamageTypes(propertyDamageTypes);
  }, [propertyDamageTypes]);

  // update project ID after changing projects
  useEffect(() => {
    if (project?.id) {
      const { id } = project;
      setProjectId(id);
    }
  }, [project]);

  return {
    project,
    projectId,
    property,
    isEditing,
    locations,
    projectDamageTypes,
    selectedDamageTypes,
    selectedDamageCause,
    selectedDamageCauseId,
    selectedDamageCategory,
    selectedLossDate,
    propertyDamageTypes,
    isCustomDamageTypeModalOpen,
    projectDamageCauses,
    propertyLossDataUpdated,
    asbestosStatuses,
    affectedLocationUpdated,
    setIsEditing,
    onEditButtonClick,
    setSelectedDamageTypes,
    setSelectedDamageCause,
    setSelectedDamageCauseId,
    setSelectedDamageCategory,
    setSelectedLossDate,
    setIsCustomDamageTypeModalOpen,
  };
};

export const useLossDataFunctions = () => useContext(LossDataContext);
