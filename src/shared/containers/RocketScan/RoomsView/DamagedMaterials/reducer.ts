import {
  CUSTOM_DAMAGED_MATERIAL_CREATED,
  CUSTOM_DAMAGED_MATERIAL_UPDATED,
  CUSTOM_DAMAGED_MATERIAL_DELETED,
  CREATE_CUSTOM_DAMAGED_MATERIAL_ERRORS,
  EDIT_CUSTOM_DAMAGED_MATERIAL_ERRORS,
  customDamagedMaterials,
} from './actions';

const initialState = {
  customDamagedMaterialCreated: false,
  customDamagedMaterialUpdated: false,
  customDamagedMaterialDeleted: false,
  createCustomDamagedMaterialErrors: {},
  editCustomDamagedMaterialErrors: {},
};

export const damagedMaterialsReducer = (state = initialState, action: customDamagedMaterials) => {
  const { type, payload } = action;

  switch (type) {
    case CUSTOM_DAMAGED_MATERIAL_CREATED:
      return {
        ...state,
        customDamagedMaterialCreated: payload,
      };
    case CUSTOM_DAMAGED_MATERIAL_UPDATED:
      return {
        ...state,
        customDamagedMaterialUpdated: payload,
      };
    case CUSTOM_DAMAGED_MATERIAL_DELETED:
      return {
        ...state,
        customDamagedMaterialDeleted: payload,
      };
    case CREATE_CUSTOM_DAMAGED_MATERIAL_ERRORS:
      return {
        ...state,
        createCustomDamagedMaterialErrors: payload,
      };
    case EDIT_CUSTOM_DAMAGED_MATERIAL_ERRORS:
      return {
        ...state,
        editCustomDamagedMaterialErrors: payload,
      };
    default:
      return state;
  }
};
