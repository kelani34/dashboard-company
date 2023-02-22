import { SET_NAV, NavActionsTypes } from './actions';

interface Nav {
  title: string;
  logoImage: string;
}

const initialState: Nav = { title: '', logoImage: '' };

export const NavReducer = (state = initialState, action: NavActionsTypes) => {
  switch (action.type) {
    case SET_NAV:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
