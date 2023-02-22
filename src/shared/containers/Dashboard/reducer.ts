import { SET_ACTIVE_PROJECT, setActiveProjectTypes, SET_MOBILE_WARNING_MODAL_SHOWN } from './actions';

const initialState = {
  activeProject: null,
  mobileWarningModalShown: false,
};

export const dashboardReducer = (state = initialState, action: setActiveProjectTypes) => {
  switch (action.type) {
    case SET_ACTIVE_PROJECT:
      return { ...state, activeProject: action.payload };
    case SET_MOBILE_WARNING_MODAL_SHOWN: {
      return {
        ...state,
        mobileWarningModalShown: action.payload,
      };
    }
    default:
      return state;
  }
};
