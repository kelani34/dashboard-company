const SET_NAV = 'SET_NAV';

interface ActionTypes {
  SET_NAV: any;
}

export interface MessageAction {
  type: keyof ActionTypes;
  payload: object;
}

export type NavActionsTypes = MessageAction;
const setNav = (data: object): NavActionsTypes => ({
  type: SET_NAV,
  payload: data,
});
export { SET_NAV, setNav };
