// state
import {
  SET_ADDRESS_REQUEST,
  RESET_ADDRESS_REQUEST,
  SET_COUNTRIES,
  SET_PROVINCES,
  SetAddressTypes,
} from "Containers/Address/actions";

const initialState = {
  countries: [],
  provinces: [],
  addressRequest: {
    google_places_id: "",
    address: "",
    addressTwo: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    latitude: "",
    longitude: "",
  },
};

export const addressReducer = (state = initialState, action: SetAddressTypes) => {
  switch (action.type) {
    case SET_COUNTRIES:
      return {
        ...state,
        countries: action.payload,
      };
    case SET_PROVINCES:
      return {
        ...state,
        provinces: action.payload,
      };
    case SET_ADDRESS_REQUEST:
      return {
        ...state,
        addressRequest: { ...state.addressRequest, ...action.payload },
      };
    case RESET_ADDRESS_REQUEST:
      return {
        ...state,
        addressRequest: initialState.addressRequest,
      };
    default:
      return state;
  }
};
