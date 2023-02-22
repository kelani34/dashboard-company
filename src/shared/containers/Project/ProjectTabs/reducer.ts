import { SET_TAB_SELECTOR, projectTabsActionTypes } from "Containers/Project/ProjectTabs/actions";

const initialState = {
  selectedTab: "all-locations-tab",
};

export const selectedTabReducer = (state = initialState, action: projectTabsActionTypes) => {
  switch (action.type) {
    case SET_TAB_SELECTOR:
      return {
        ...state,
        selectedTab: action.payload,
      };

    default:
      return state;
  }
};
