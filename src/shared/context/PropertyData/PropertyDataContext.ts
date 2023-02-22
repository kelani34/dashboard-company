import { createContext, useCallback, useContext, useState } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectSelector, propertySelector, projectTypesSelector } from 'Containers/RocketScan/selectors';

import {
  propertyDataSelector,
  propertyDataEditedSelector,
  asbestosStatusesSelector,
} from 'Containers/ProjectData/PropertyData/selectors';

export const PropertyDataContext = createContext({});

export const PropertyDataFunctions = () => {
  // local state
  const [editIsOpen, setEditIsOpen] = useState(false);

  // selectors
  const project = useSelector(projectSelector, areEqual);
  const property = useSelector(propertySelector, areEqual); // using propertyData no instead
  const projectTypes = useSelector(projectTypesSelector, areEqual);
  const propertyData = useSelector(propertyDataSelector, areEqual);
  const propertyDataEdited = useSelector(propertyDataEditedSelector, areEqual);
  const asbestosStatuses = useSelector(asbestosStatusesSelector, areEqual);

  const onEditButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setEditIsOpen((prev) => !prev);
  }, []);

  return {
    project,
    property,
    projectTypes,
    asbestosStatuses,
    propertyData,
    editIsOpen,
    propertyDataEdited,
    setEditIsOpen,
    onEditButtonClick,
  };
};

export const usePropertyDataFunctions = () => useContext(PropertyDataContext);
