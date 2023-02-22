import { createContext, useCallback, useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectAddressSelector, projectSelector, propertySelector } from 'Containers/RocketScan/selectors';
import { listLocationClaims, setLocationClaimSelected } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import {
  locationsSelector,
  locationClaimsSelector,
  locationClaimSelector,
} from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import {
  claimsSelector,
  claimCreatedSelector,
  claimsTypesSelector,
  unitClaimCreatedSelector,
  claimUpdatedSelector,
  claimDeletedSelector,
} from 'Containers/ProjectData/ClaimsData/selectors';
import { setClaimCreated, setClaimUpdated } from 'Containers/ProjectData/ClaimsData/actions';

export const ClaimsDataContext = createContext({});

export const ClaimsDataFunctions = () => {
  const dispatch = useDispatch();
  // local state
  const [unitClaimModalIsOpen, setUnitClaimModalIsOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);
  const [editIsOpen, setEditIsOpen] = useState(false);
  const [unit, setUnit] = useState('');
  const [deleteUnitClaimModalIsOpen, setDeleteUnitClaimModalIsOpen] = useState(false);

  // selectors
  const projectAddress = useSelector(projectAddressSelector, areEqual);
  const locations = useSelector(locationsSelector, areEqual);
  const unitClaims = useSelector(locationClaimsSelector, areEqual);
  const project = useSelector(projectSelector, areEqual);
  const claims = useSelector(claimsSelector, areEqual);
  const claimCreated = useSelector(claimCreatedSelector, areEqual);
  const claimUpdated = useSelector(claimUpdatedSelector, areEqual);
  const claimTypes = useSelector(claimsTypesSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const unitClaimCreated = useSelector(unitClaimCreatedSelector, areEqual);
  const unitClaim = useSelector(locationClaimSelector, areEqual);
  const claimDeleted = useSelector(claimDeletedSelector, areEqual);

  const onEditButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setEditIsOpen((prev) => !prev);
  }, []);

  const onAddUnitButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setIsEditModal(false);
    setUnitClaimModalIsOpen(true);
  }, []);

  const onUnitClaimButtonClick = useCallback((unit: any, claim: any) => {
    dispatch(setLocationClaimSelected(claim));
    setUnit(unit);
    setIsEditModal(true);
    setUnitClaimModalIsOpen(true);
  }, []);

  const onDeleteClaimButtonClick = useCallback((e: any) => {
    e.preventDefault();
    setDeleteUnitClaimModalIsOpen(true);
  }, []);

  return {
    unitClaimModalIsOpen,
    setUnitClaimModalIsOpen,
    editIsOpen,
    setEditIsOpen,
    projectAddress,
    locations,
    unitClaims,
    project,
    property,
    claims,
    claimCreated,
    claimUpdated,
    setClaimCreated,
    setClaimUpdated,
    unitClaimCreated,
    claimTypes,
    onEditButtonClick,
    onAddUnitButtonClick,
    listLocationClaims,
    onUnitClaimButtonClick,
    isEditModal,
    unitClaim,
    unit,
    deleteUnitClaimModalIsOpen,
    setDeleteUnitClaimModalIsOpen,
    onDeleteClaimButtonClick,
    claimDeleted,
  };
};

export const useClaimsDataFunctions = () => useContext(ClaimsDataContext);
