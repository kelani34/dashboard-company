import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  damagedMaterialsSelector,
  damageTypesSelector,
  unitOfMeasurementTypesSelector,
  scopeActionTypesSelector,
  projectHasNewDamageTypesSelector,
} from 'Containers/RocketScan/selectors';
import { areEqual } from 'Utils/equalityChecks';
import { addOrRemoveFromArray } from 'Utils/helpers';
import {
  syncRoomDamagedMaterials,
  updateMaterialScopeOfWork,
  getRoomDamageMaterials,
} from 'Containers/RocketScan/RoomsView/DamagedMaterials/actions';

export const DamagedMaterialsContext = createContext({});

export const DamagedMaterialFunctions = (roomId: number, roomDamagedMaterials: any[]) => {
  const dispatch = useDispatch();

  // local state
  const [selectedDamagedType, setSelectedDamagedType] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [damagesCount, setDamagesCount] = useState(0);
  const [selectedMaterials, setSelectedMaterials] = useState([]);
  const [prevSelectedMaterials, setPrevSelectedMaterials] = useState([]);
  const [isMaterialsModalOpen, setIsMaterialsModalOpen] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [damageTypes, setDamageTypes] = useState([]);

  // selectors
  const damageTypesUnfiltered = useSelector(damageTypesSelector, areEqual);
  const damagedMaterials = useSelector(damagedMaterialsSelector, areEqual);
  const unitOfMeasurementTypes = useSelector(unitOfMeasurementTypesSelector, areEqual);
  const scopeActionTypes = useSelector(scopeActionTypesSelector, areEqual);
  const useNewDamageTypes = useSelector(projectHasNewDamageTypesSelector, areEqual);

  useEffect(() => {
    setSelectedMaterials(roomDamagedMaterials);
    setPrevSelectedMaterials(roomDamagedMaterials);
    setDamagesCount(roomDamagedMaterials.length);
  }, []);

  useEffect(() => {
    if (damageTypesUnfiltered) {
      if (useNewDamageTypes) {
        setDamageTypes(damageTypesUnfiltered.filter((type) => type.version === 'common' || type.version === 'new'));
      } else {
        setDamageTypes(damageTypesUnfiltered.filter((type) => type.version === 'common' || type.version === 'old'));
      }
    }
  }, [damageTypesUnfiltered, useNewDamageTypes]);

  // helpers
  const refetchDamagedMaterialsAfterUpdate = useCallback(async () => {
    const response: any = await dispatch(getRoomDamageMaterials(roomId));

    if (response?.data) {
      setSelectedMaterials(response.data);
      setPrevSelectedMaterials(response.data);
      setDamagesCount(roomDamagedMaterials.length);
    }
  }, []);

  const updateDamagedMaterialsSelection = useCallback(async () => {
    // prepare ids and make the api call
    const materialIds = selectedMaterials.map((material: any) => material.id.toString());

    // make the api call only if length is different, this means user has change his selection
    if (roomDamagedMaterials.length !== materialIds.length) {
      dispatch(syncRoomDamagedMaterials(roomId, { damage_material_ids: materialIds }));
    }
  }, [selectedMaterials, roomDamagedMaterials]);

  // callbacks
  //
  const onDamagedTypeTileClick = useCallback(
    (id: number) => {
      setSelectedDamagedType(id);
      setIsMaterialsModalOpen(true);
      // save the current selected materials so it can be restored
      setPrevSelectedMaterials(selectedMaterials);
    },
    [selectedMaterials]
  );

  const onDamagedListItemClick = useCallback(
    (material: any) => {
      setSelectedMaterials(addOrRemoveFromArray(selectedMaterials, material));
    },
    [selectedMaterials]
  );

  const updateScope = useCallback((materialId: number, requestData: any) => {
    dispatch(updateMaterialScopeOfWork(roomId, materialId, requestData));
  }, []);

  const onClickEditButton = useCallback(() => {
    setEditMode((prev) => !prev);
    setIsUploading(false);
    setSelectedDamagedType(null);
    (async function updateDamageMaterials() {
      await refetchDamagedMaterialsAfterUpdate();
    })();
  }, [editMode, refetchDamagedMaterialsAfterUpdate]);

  // for when user clicks the save button on the damaged materials modal
  const onClickSaveButton = useCallback(() => {
    (async function updateData() {
      await updateDamagedMaterialsSelection();
    })();
    setIsUploading(true);
    setIsMaterialsModalOpen(false);
    setPrevSelectedMaterials(roomDamagedMaterials);

    // update
    setTimeout(async () => {
      await refetchDamagedMaterialsAfterUpdate();
    }, 2000);
  }, [updateDamagedMaterialsSelection, roomDamagedMaterials]);

  // for when user clicks the cancel button on the damaged materials modal
  const onClickCancelButton = useCallback(() => {
    setIsMaterialsModalOpen(false);
    // undo any possible changes
    setSelectedMaterials(prevSelectedMaterials);
  }, [prevSelectedMaterials]);

  useEffect(() => {
    setDamagesCount(selectedMaterials?.length);
  }, [selectedMaterials]);

  return {
    selectedDamagedType,
    roomId,
    editMode,
    damagesCount,
    damageTypes,
    damagedMaterials,
    selectedMaterials,
    unitOfMeasurementTypes,
    scopeActionTypes,
    isUploading,
    isMaterialsModalOpen,
    onClickEditButton,
    onDamagedListItemClick,
    onDamagedTypeTileClick,
    updateScope,
    setIsUploading,
    onClickSaveButton,
    onClickCancelButton,
  };
};

export const useDamagedMaterialFunctions = () => useContext(DamagedMaterialsContext);
