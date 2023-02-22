import { handleApiRequest } from 'Utils/handleApiRequest';
import { trimAndToLowerCase } from 'Utils/helpers';
import { setFetchingProject, setProperty } from 'Containers/RocketScan/actions';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { setLocationsPhotosCount } from 'Containers/RocketScan/Header/ActionsCenter/actions';

export const LOCATION_TYPES = 'LOCATION_TYPES';
export const SET_LOCATION = 'SET_LOCATION';
export const LOCATION_ROOM_CREATED = 'LOCATION_ROOM_CREATED';
export const LOCATION_CREATED = 'LOCATION_CREATED';
export const LOCATION_DELETED = 'LOCATION_DELETED';
export const SET_LOCATIONS = 'SET_LOCATIONS';
export const FETCHING_LOCATIONS = 'FETCHING_LOCATIONS';
export const REFRESH_LOCATIONS = 'REFRESH_LOCATIONS';
export const LOCATION_EDIT_FORM_ERRORS = 'LOCATION_EDIT_FORM_ERRORS';
export const EXTERIOR_LOCATION = 'EXTERIOR_LOCATION';
export const MULTI_UNIT_EXTERIOR_LOCATION_CREATED = 'MULTI_UNIT_EXTERIOR_LOCATION_CREATED';
export const LOCATION_CLAIM_CREATED = 'LOCATION_CLAIM_CREATED';
export const LOCATION_CLAIM_CREATE_ERRORS = 'LOCATION_CLAIM_CREATE_ERRORS';
export const LOCATION_CLAIMS = 'LOCATION_CLAIMS';
export const SET_LOCATION_CLAIM_SELECTED = 'SET_LOCATION_CLAIM_SELECTED';

interface ActionTypes {
  LOCATION_TYPES: any[];
  SET_LOCATION: any;
  LOCATION_ROOM_CREATED: boolean;
  LOCATION_CREATED: boolean;
  LOCATION_DELETED: boolean;
  SET_LOCATIONS: any;
  FETCHING_LOCATIONS: boolean;
  REFRESH_LOCATIONS: boolean;
  LOCATION_EDIT_FORM_ERRORS: any;
  EXTERIOR_LOCATION: any;
  MULTI_UNIT_EXTERIOR_LOCATION_CREATED: boolean;
  LOCATION_CLAIM_CREATED: boolean;
  LOCATION_CLAIM_CREATE_ERRORS: any;
  LOCATION_CLAIMS: any;
  SET_LOCATION_CLAIM_SELECTED: any;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

interface CreateLocationOptions {
  isMultiUnitExterior?: boolean;
  propertyName?: string;
  roomTypeId?: any;
}

export type locationsActionTypes = MessageAction;

/*
 * NON API THUNKS
 * */

const setLocationTypes = (locationTypes: any) => (dispatch) => {
  const types = locationTypes.map((type: any) => ({
    id: type.id,
    name: trimAndToLowerCase(type.name),
  }));

  dispatch({
    type: LOCATION_TYPES,
    payload: types,
  });
};

export const setLocationRoomCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: LOCATION_ROOM_CREATED,
    payload: value,
  });
};

export const setLocationCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: LOCATION_CREATED,
    payload: value,
  });
};

export const setLocationDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: LOCATION_DELETED,
    payload: value,
  });
};

export const setMultiUnitExteriorLocationCreated = (value: number) => (dispatch) => {
  dispatch({
    type: MULTI_UNIT_EXTERIOR_LOCATION_CREATED,
    payload: value,
  });
};

export const setLocation = (location: any) => (dispatch) => {
  dispatch({
    type: SET_LOCATION,
    payload: location,
  });
};

export const setFetchingLocations = (value: boolean) => (dispatch) => {
  dispatch({
    type: FETCHING_LOCATIONS,
    payload: value,
  });
};

export const clearLocations = () => (dispatch) => {
  dispatch({
    type: SET_LOCATIONS,
    payload: undefined,
  });
};

export const setRefreshLocations = (value: boolean) => (dispatch) => {
  dispatch({
    type: REFRESH_LOCATIONS,
    payload: value,
  });
};

export const setLocationClaimCreated = (value: boolean) => (dispatch) => {
  dispatch({
    type: LOCATION_CLAIM_CREATED,
    payload: value,
  });
};

export const setLocationClaimSelected = (selected: object) => async (dispatch: any) => {
  dispatch({
    type: SET_LOCATION_CLAIM_SELECTED,
    payload: selected,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const listLocationTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`location-types`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setLocationTypes(data));
    }
  };

// create new unit or floor for
// single unit, multiple unit, and commercial projects
export const createLocation =
  (
    projectId: number,
    propertyTypeId: number,
    requestedData: any,
    propertyId = '',
    setLocalLocationCreated = undefined
  ) =>
  async (dispatch: any, _getState = null, utils: any) => {
    let properties: any = {};

    // create a new property
    if (!propertyId) {
      properties = await handleApiRequest(
        dispatch,
        utils.Api.post(`/projects/${projectId}/properties`, { property_type_id: propertyTypeId })
      );
    }

    if (properties?.data || propertyId) {
      let response: any = {};

      if (!propertyId) {
        const {
          data: { id: propertyId },
        } = properties;

        let propertyName = 'single unit';
        if (propertyTypeId === 2) {
          propertyName = 'multi unit';
        }
        if (propertyTypeId === 4) {
          propertyName = 'commercial';
        }

        dispatch(setProperty(properties.data, { name: propertyName }));

        response = await handleApiRequest(
          dispatch,
          utils.Api.post(`properties/${propertyId}/locations`, requestedData)
        );
      } else {
        response = await handleApiRequest(
          dispatch,
          utils.Api.post(`properties/${propertyId}/locations`, requestedData)
        );
      }

      if (response?.data) {
        const {
          data: { id: locationId },
        } = response;

        // set location
        dispatch(getLocation(locationId));

        if (setLocalLocationCreated) {
          setLocalLocationCreated(true);
        } else {
          dispatch(setLocationCreated(true));
        }
      } else {
        // we should delete the property in case if the locations api fails
        // await handleApiRequest(dispatch, utils.Api.delete(`/properties/${propertyId}`));
        // disable the spinner on any errors
        dispatch(setFetchingProject(false));
      }
    } else {
      // clearing state
      dispatch({
        type: SET_LOCATION,
        payload: [],
      });
      // disable the spinner on any errors
      dispatch(setFetchingProject(false));
    }
  };

export const createLocationForTempProperty =
  (
    propertyTypeId: number,
    requestedData: any,
    propertyId: any,
    options?: CreateLocationOptions,
    setLocalLocationCreated = undefined
  ) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const propertyResponse = await handleApiRequest(
      dispatch,
      utils.Api.put(`properties/${propertyId}`, { property_type_id: propertyTypeId })
    );

    if (propertyResponse?.data) {
      // set actual property type value
      const { data: property } = propertyResponse;

      let propertyName = options?.propertyName;
      if (!propertyName) {
        if (propertyTypeId === 2) {
          propertyName = 'multi unit';
        } else if (propertyTypeId === 4) {
          propertyName = 'commercial';
        } else {
          propertyName = 'single unit';
        }
      }
      dispatch(setProperty(property, { name: propertyName }));

      // create location
      const locationResponse = await handleApiRequest(
        dispatch,
        utils.Api.post(`properties/${propertyId}/locations`, requestedData)
      );

      if (locationResponse?.data) {
        const {
          data: { id: locationId },
        } = locationResponse;

        // set location
        dispatch(getLocation(locationId));

        // create room for single location project
        if (options?.roomTypeId) {
          const roomResponse = await handleApiRequest(
            dispatch,
            utils.Api.post(`/locations/${locationId}/rooms`, {
              room_type_id: options.roomTypeId,
            })
          );
        }

        // handle any action done after location is created
        if (setLocalLocationCreated) {
          setLocalLocationCreated(true);
        } else {
          dispatch(setLocationCreated(true));
        }
        if (options?.isMultiUnitExterior) {
          dispatch(setMultiUnitExteriorLocationCreated(locationId));
        }

        dispatch(setFetchingProject(false));
      } else {
        // we should delete the property in case if the locations api fails
        // await handleApiRequest(dispatch, utils.Api.delete(`/properties/${propertyId}`));
        // disable the spinner on any errors
        dispatch(setFetchingProject(false));
      }
    } else {
      // clearing state
      dispatch({
        type: SET_LOCATION,
        payload: [],
      });
      // disable the spinner on any errors
      dispatch(setFetchingProject(false));
    }
  };

// create new single location and its' room
export const createSingleLocation =
  (projectId: number, propertyTypeId: number, requestedData: any, roomTypeId) =>
  async (dispatch: any, _getState = null, utils: any) => {
    let property = await handleApiRequest(
      dispatch,
      utils.Api.post(`/projects/${projectId}/properties`, { property_type_id: propertyTypeId })
    );

    if (property?.data) {
      const {
        data: { id: propertyId },
      } = property;

      // set property
      dispatch(setProperty(property.data, { name: 'single location' }));

      let location = await handleApiRequest(
        dispatch,
        utils.Api.post(`properties/${propertyId}/locations`, requestedData)
      );

      if (location?.data) {
        const {
          data: { id: locationId },
        } = location;

        // set location
        dispatch(getLocation(locationId));

        const response = await handleApiRequest(
          dispatch,
          utils.Api.post(`/locations/${locationId}/rooms`, {
            room_type_id: roomTypeId,
          })
        );

        if (response?.data) {
          dispatch(setFetchingProject(false));
        } else {
          dispatch(setFetchingProject(false));
        }
      } else {
        dispatch(setFetchingProject(false));
      }
    } else {
      dispatch(setFetchingProject(false));
    }
  };

// create new exterior location and its' room
export const createExteriorLocation =
  (projectId: number, propertyTypeId: number, requestedData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    let property = await handleApiRequest(
      dispatch,
      utils.Api.post(`/projects/${projectId}/properties`, { property_type_id: propertyTypeId })
    );

    if (property?.data) {
      const {
        data: { id: propertyId },
      } = property;

      // set property
      dispatch(setProperty(property.data, { name: 'exterior' }));

      let location = await handleApiRequest(
        dispatch,
        utils.Api.post(`properties/${propertyId}/locations`, requestedData)
      );

      if (location?.data) {
        const {
          data: { id: locationId },
        } = location;

        // set location
        dispatch(getLocation(locationId));
        dispatch(setFetchingProject(false));
      } else {
        dispatch(setFetchingProject(false));
      }
    } else {
      dispatch(setFetchingProject(false));
    }
  };

export const createExteriorLocationWithoutRoom =
  (projectId: number, property: any, propertyTypeId: number, requestedData: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    dispatch(setFetchingLocations(true));
    let response = property;
    if (!response?.id) {
      response = await handleApiRequest(
        dispatch,
        utils.Api.post(`/projects/${projectId}/properties`, { property_type_id: propertyTypeId })
      );

      if (response?.data) {
        response = response.data;
      }
    }

    if (response?.id) {
      const { id: propertyId } = response;

      // set property
      dispatch(setProperty(response, { name: 'multiunit' }));

      let location = await handleApiRequest(
        dispatch,
        utils.Api.post(`properties/${propertyId}/locations`, requestedData)
      );

      if (location?.data) {
        const {
          data: { id: locationId },
        } = location;

        dispatch(setMultiUnitExteriorLocationCreated(locationId));
        dispatch(setFetchingLocations(false));
      } else {
        dispatch(setFetchingLocations(false));
      }
    } else {
      dispatch(setFetchingLocations(false));
    }
  };

// create new room for floor or unit in locations view
export const createLocationRoom =
  (locationId: number, roomTypeId: number, levelId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`/locations/${locationId}/rooms`, {
        room_type_id: roomTypeId,
        level_id: levelId,
      }),
      FORM_ERRORS
    );

    if (response?.data) {
      dispatch(setLocationRoomCreated(true));
    }
  };

// get paginated locations
export const listLocations =
  (propertyId: number, pageNumber = 1, limit = 10) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`properties/${propertyId}/locations`, {
        params: {
          include: 'locationType,roomsCount,photos_count',
          sort: '-floor_number,location_type,-name',
          limit,
          page: pageNumber,
        },
      }),
      FORM_ERRORS,
      FETCHING_LOCATIONS
    );

    if (response?.data?.length > 0) {
      dispatch({
        type: SET_LOCATIONS,
        payload: {
          ...response,
          pageNumber,
        },
      });
    } else {
      dispatch({
        type: SET_LOCATIONS,
        payload: undefined,
      });
    }
  };

// get a single location
export const getLocation =
  (locationId: string, setLocalLocationCreated = null) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`locations/${locationId}`, {
        params: {
          include: 'locationType,roomsCount,bookmarked_notes_count,flagged_notes_count,photos_count',
        },
      })
    );

    if (response?.data) {
      const { data } = response;
      dispatch(setLocation(data));

      const { photos_count: photosCount } = data;

      dispatch(setLocationsPhotosCount(photosCount));
      // using this to close the edit location modal
      if (setLocalLocationCreated) setLocalLocationCreated(true);
    }
  };

// update location
export const updateLocation =
  (locationId: string, requestData: any, setLocalLocationCreated: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.put(`locations/${locationId}`, requestData),
      LOCATION_EDIT_FORM_ERRORS
    );

    if (response?.data) {
      dispatch(getLocation(locationId, setLocalLocationCreated));
    }
  };

// get exterior location
export const getExteriorLocation =
  (propertyId: number, locationTypeId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`properties/${propertyId}/locations`, {
        params: {
          include: 'locationType,roomsCount,photos_count',
          sort: '-floor_number,location_type,-name',
          limit: '1',
          'filter[location_type]': locationTypeId,
        },
      }),
      FORM_ERRORS,
      FETCHING_LOCATIONS
    );

    if (response?.data?.length > 0) {
      const { data: locations } = response;
      const [location] = locations;

      dispatch({
        type: EXTERIOR_LOCATION,
        payload: location,
      });
    } else {
      dispatch({
        type: EXTERIOR_LOCATION,
        payload: undefined,
      });
    }
  };

export const createLocationClaim =
  (locationId: number, requestData) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`/locations/${locationId}/claims`, requestData),
      LOCATION_CLAIM_CREATE_ERRORS
    );

    if (response?.data) {
      dispatch(setLocationClaimCreated(true));
    }
  };

export const listLocationClaims =
  (locationId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`locations/${locationId}/claims`, {
        params: {
          include: 'claim_type',
        },
      })
    );
  };

export const deleteLocation =
  (locationId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`locations/${locationId}`));

    if (typeof response === 'string') {
      dispatch(setLocationDeleted(true));
      dispatch(setRefreshLocations(true));
    }
  };
