// types
export const SET_UNIT_TYPE_URL = "SET_UNIT_TYPE_URL";

interface ActionTypes {
  SET_UNIT_TYPE_URL: string;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: string;
}

// TODO::ADD THUNKS FOR DIFFERENT TYPES OF SPINNERS

export const setSelectedUnitTypeUrl = (payload: string) => ({
  type: SET_UNIT_TYPE_URL,
  payload,
});
export type SetUnitTypes = MessageAction;
