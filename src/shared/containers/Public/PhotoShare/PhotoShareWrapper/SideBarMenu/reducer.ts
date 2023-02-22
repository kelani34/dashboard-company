import { SET_MENU_ITEMS, setMenuItemActionTypes, FETCHING_ITEMS } from './actions';

const initialState = {
  items: [],
  fetchingItems: true,
};

export const menuItemsReducer = (state = initialState, action: setMenuItemActionTypes) => {
  switch (action.type) {
    case SET_MENU_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case FETCHING_ITEMS:
      return {
        ...state,
        fetchingItems: action.payload,
      };
    default:
      return state;
  }
};
