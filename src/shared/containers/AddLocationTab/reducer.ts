// types
import { SET_UNIT_TYPE_URL, SetUnitTypes } from './actions';

const routeBasePath: string = '/projects/photoManagement/';
const singleUnitTypeRoute: string = 'addLocations/single';
const multiUnitTypeRoute: string = 'addLocations/multiUnit/add';
const allLocationsRoute: string = 'allLocations';
let selectedRoute = `${routeBasePath}${allLocationsRoute}`;

// state
const initialState = {
  selectedUnitTypeUrl: selectedRoute,
};

// we we'll use this for system variables, etc. loaders
export const addLocationsReducer = (state = initialState, action: SetUnitTypes) => {
  switch (action.type) {
    case SET_UNIT_TYPE_URL: {
      const selectedPath: string = action.payload;

      if (selectedPath === singleUnitTypeRoute) {
        selectedRoute = `${routeBasePath}${singleUnitTypeRoute}`;
      }

      if (selectedPath === multiUnitTypeRoute) {
        selectedRoute = `${routeBasePath}${multiUnitTypeRoute}`;
      }

      return {
        ...state,
        selectedUnitTypeUrl: selectedRoute,
      };
    }
    default:
      return state;
  }
};
