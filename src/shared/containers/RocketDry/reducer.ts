import {
  RocketDryActionTypes,
  SET_PROJECT_ATMOSPHERIC_LOGS,
  SET_PROJECT_EQUIPMENT_LIST,
} from 'Containers/RocketDry/actions';

const initialState = {
  projectAtmosphericLogs: [],
  projectEquipmentList: [],
};

export const rocketDryReducer = (state = initialState, action: RocketDryActionTypes) => {
  const { type, payload } = action;

  switch (type) {
    case SET_PROJECT_ATMOSPHERIC_LOGS:
      return {
        ...state,
        projectAtmosphericLogs: payload,
      };
    case SET_PROJECT_EQUIPMENT_LIST:
      return {
        ...state,
        projectEquipmentList: payload,
      };
    default:
      return state;
  }
};
