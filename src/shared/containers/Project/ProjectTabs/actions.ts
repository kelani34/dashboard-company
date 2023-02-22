/* eslint-disable */

export const SET_TAB_SELECTOR = "SET_TAB_SELECTOR";

interface ActionTypes {
  SET_TAB_SELECTOR: string;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: string;
}

export type projectTabsActionTypes = MessageAction;

export const setSelectedTab = (payload: string) => ({
  type: SET_TAB_SELECTOR,
  payload,
});
