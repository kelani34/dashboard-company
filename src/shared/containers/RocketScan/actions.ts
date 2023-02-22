import { handleApiRequest } from 'Utils/handleApiRequest';
import { trimAndToLowerCase } from 'Utils/helpers';
import { FORM_ERRORS } from 'Containers/Core/actions';
import { SET_LOCATION, setLocationCreated } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { setRoomLevels } from 'Containers/RocketScan/RoomsView/RoomButtons/actions';
import { setLevelForButtons } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { setLocationsPhotosCount, setProjectPhotosCount } from 'Containers/RocketScan/Header/ActionsCenter/actions';
import { getDamageTypeVersion } from './damageTypeFilters';

export const SET_PROJECT_ID = 'SET_PROJECT_ID';
export const SET_PROJECT_COMPANY_ID = 'SET_PROJECT_COMPANY_ID';
export const SET_LOCATION_ID = 'SET_LOCATION_ID';
export const SET_PHOTO_ID = 'SET_PHOTO_ID';
export const SET_SELECTED_TAB = 'SET_SELECTED_TAB';
export const SET_PROJECT_ADDRESS = 'SET_PROJECT_ADDRESS';
export const SET_PROJECT = 'SET_PROJECT';
export const SET_PROJECT_STATUS = 'SET_PROJECT_STATUS';
export const SET_PROJECT_ADDRESS_OBJECT = 'SET_PROJECT_ADDRESS_OBJECT';
export const SET_PROJECT_ALIAS = 'SET_PROJECT_ALIAS';
export const SET_PROJECT_HAS_NEW_DAMAGE_TYPES = 'SET_PROJECT_HAS_NEW_DAMAGE_TYPES';
export const SET_PROJECT_TYPES = 'SET_PROJECT_TYPES';
export const SET_PROPERTY = 'SET_PROPERTY';
export const SET_PROPERTY_TYPES = 'SET_PROPERTY_TYPES';
export const SET_ROOM_TYPES = 'SET_ROOM_TYPES';
export const SET_SELECTED_PHOTO_FILTER = 'SET_SELECTED_PHOTO_FILTER';
export const SET_ALBUM_TYPES = 'SET_ALBUM_TYPES';
export const FETCHING_PROJECT = 'FETCHING_PROJECT';
export const SET_DEFAULT_ROOM_LEVEL_ID = 'SET_DEFAULT_ROOM_LEVEL_ID';
export const SET_DEFAULT_EXTERIOR_LEVEL_ID = 'SET_DEFAULT_EXTERIOR_LEVEL_ID';
export const FETCHING_LOCATIONS = 'FETCHING_LOCATIONS';
export const SET_UNIT_ROOM_TYPES = 'SET_UNIT_ROOM_TYPES';
export const SET_COMMERCIAL_ROOM_TYPES = 'SET_COMMERCIAL_ROOM_TYPES';
export const SET_FLOOR_ROOM_TYPES = 'SET_FLOOR_ROOM_TYPES';
export const SET_SINGLE_LOCATION_ROOM_TYPES = 'SET_SINGLE_LOCATION_ROOM_TYPES';
export const SET_INDUSTRIAL_ROOM_TYPES = 'SET_INDUSTRIAL_ROOM_TYPES';
export const SET_LEVEL_TYPES = 'SET_LEVEL_TYPES';
export const SET_EXTERIOR_LEVEL_TYPES = 'SET_EXTERIOR_LEVEL_TYPES';
export const SET_INDUSTRIAL_ROOM_LEVELS = 'SET_INDUSTRIAL_ROOM_LEVELS';
export const SET_EXTERIOR_LOCATION_ROOM_TYPES = 'SET_EXTERIOR_LOCATION_ROOM_TYPES';
export const SET_SINGLE_UNIT_EXTERIOR_ROOM_TYPES = 'SET_SINGLE_UNIT_EXTERIOR_ROOM_TYPES';
export const SET_MULTI_UNIT_EXTERIOR_ROOM_TYPES = 'SET_MULTI_UNIT_EXTERIOR_ROOM_TYPES';
export const SET_EXTERIOR_ROOM_TYPES = 'SET_EXTERIOR_ROOM_TYPES';
export const SET_DAMAGE_TYPES = 'SET_DAMAGE_TYPES';
export const SET_DAMAGED_MATERIALS = 'SET_DAMAGED_MATERIALS';
export const SET_CATEGORIES = 'SET_CATEGORIES';
export const SET_SELECTED_CATEGORIES = 'SET_SELECTED_CATEGORIES';
export const SET_PROJECT_UNAVAILABLE = 'SET_PROJECT_UNAVAILABLE';
export const SET_UNIT_OF_MEASUREMENT_TYPES = 'SET_UNIT_OF_MEASUREMENT_TYPES';
export const SET_SCOPE_ACTION_TYPES = 'SET_SCOPE_ACTION_TYPES';
interface ActionTypes {
  SET_PROJECT_ID: string;
  SET_PROJECT_COMPANY_ID: string;
  SET_LOCATION_ID: string;
  SET_PHOTO_ID: string;
  SET_SELECTED_TAB: string;
  SET_PROJECT_ADDRESS: string;
  SET_PROJECT: any;
  SET_PROJECT_STATUS: any;
  SET_PROJECT_ADDRESS_OBJECT: any;
  SET_PROJECT_ALIAS: any;
  SET_PROJECT_HAS_NEW_DAMAGE_TYPES: boolean;
  SET_PROJECT_TYPES: any[];
  SET_PROPERTY: any;
  SET_PROPERTY_TYPES: any[];
  SET_ROOM_LIST: any[];
  SET_ROOM_TYPES: any[];
  SET_SELECTED_PHOTO_FILTER: number;
  SET_ALBUM_TYPES: any[];
  FETCHING_PROJECT: boolean;
  SET_DEFAULT_ROOM_LEVEL_ID: number;
  SET_DEFAULT_EXTERIOR_LEVEL_ID: number;
  FETCHING_LOCATIONS: boolean;
  FETCHING_ROOMS: boolean;
  SET_UNIT_ROOM_TYPES: any[];
  SET_COMMERCIAL_ROOM_TYPES: any[];
  SET_FLOOR_ROOM_TYPES: any[];
  SET_LEVEL_TYPES: any[];
  SET_EXTERIOR_LEVEL_TYPES: any[];
  SET_SINGLE_LOCATION_ROOM_TYPES: any[];
  SET_INDUSTRIAL_ROOM_TYPES: any[];
  SET_INDUSTRIAL_ROOM_LEVELS: any[];
  SET_EXTERIOR_LOCATION_ROOM_TYPES: any[];
  SET_SINGLE_UNIT_EXTERIOR_ROOM_TYPES: any[];
  SET_MULTI_UNIT_EXTERIOR_ROOM_TYPES: any[];
  SET_EXTERIOR_ROOM_TYPES: any[];
  SET_DAMAGE_TYPES: any[];
  SET_DAMAGED_MATERIALS: any[];
  SET_CATEGORIES: any[];
  SET_SELECTED_CATEGORIES: any[];
  SET_PROJECT_UNAVAILABLE: boolean;
  SET_UNIT_OF_MEASUREMENT_TYPES: any[];
  SET_SCOPE_ACTION_TYPES: any[];
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type rocketScanActionTypes = MessageAction;

/*
 * NON API THUNKS, NOT ASYNC
 * */

export const setSelectedTab = (tab: string) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_TAB,
    payload: tab,
  });
};

export const setProjectId = (id: string) => (dispatch) => {
  dispatch({
    type: SET_PROJECT_ID,
    payload: id,
  });
};

export const setProjectStatus = (value: any) => async (dispatch) => {
  dispatch({
    type: SET_PROJECT_STATUS,
    payload: value,
  });
};

export const setSimpleProjectAddress = (value: string) => async (dispatch) => {
  dispatch({
    type: SET_PROJECT_ADDRESS,
    payload: value,
  });
};

export const setProjectAddressObject = (value: any) => async (dispatch) => {
  dispatch({
    type: SET_PROJECT_ADDRESS_OBJECT,
    payload: value,
  });
};

export const setProjectCompanyId = (id: string) => (dispatch) => {
  dispatch({
    type: SET_PROJECT_COMPANY_ID,
    payload: id,
  });
};

export const setLocationId = (id: string) => (dispatch) => {
  dispatch({
    type: SET_LOCATION_ID,
    payload: id,
  });
};

export const setPhotoId = (id: string) => (dispatch) => {
  dispatch({
    type: SET_PHOTO_ID,
    payload: id,
  });
};

export const setProjectUnavailable = (value: boolean) => (dispatch) => {
  dispatch({
    type: SET_PROJECT_UNAVAILABLE,
    payload: value,
  });
};

export const clearProperty = () => (dispatch) => {
  dispatch({
    type: SET_PROPERTY,
    payload: undefined,
  });
};

export const setProperty = (property: any, propertyType: any) => (dispatch) => {
  const { id } = property;
  const { name } = propertyType;

  dispatch({
    type: SET_PROPERTY,
    payload: {
      id,
      name: trimAndToLowerCase(name),
    },
  });
};

export const setPropertyTypes = (propertyTypes: any) => (dispatch) => {
  const types = propertyTypes.map((type: any) => ({
    id: type.id,
    name: trimAndToLowerCase(type.name),
  }));

  dispatch({
    type: SET_PROPERTY_TYPES,
    payload: types,
  });
};

export const setProjectTypes = (projectTypes: any) => (dispatch) => {
  const types = projectTypes.map((type: any) => ({
    id: type.id,
    name: type.name,
  }));

  dispatch({
    type: SET_PROJECT_TYPES,
    payload: types,
  });
};

export const setProjectAlias = (alias: any) => (dispatch) => {
  dispatch({
    type: SET_PROJECT_ALIAS,
    payload: alias,
  });
};

export const setProjectHasNewDamageTypes = (value: boolean) => (dispatch) => {
  dispatch({
    type: SET_PROJECT_HAS_NEW_DAMAGE_TYPES,
    payload: value,
  });
};

export const setAlbumTypes = (albumTypes: any) => (dispatch) => {
  const types = albumTypes.map((type: any) => ({
    id: type.id,
    name: type.name,
    filter: trimAndToLowerCase(type.name),
  }));

  dispatch({
    type: SET_ALBUM_TYPES,
    payload: types,
  });
};

export const setFetchingProject = (value: boolean) => (dispatch) => {
  dispatch({
    type: FETCHING_PROJECT,
    payload: value,
  });
};

export const setRoomTypes = (type: string, data: any) => (dispatch) => {
  dispatch({
    type,
    payload: data,
  });
};

export const setRoomLevelsForContainers = (type: string, data: any) => (dispatch) => {
  dispatch({
    type,
    payload: data,
  });
};

export const setSelectedPhotoFilter = (value: number) => async (dispatch) => {
  dispatch({
    type: SET_SELECTED_PHOTO_FILTER,
    payload: value,
  });
};

export const setDamageTypes = (damageTypes: any) => (dispatch) => {
  // sort by type name and note which damage type version it belongs to
  const types = damageTypes
    .map((type: any) => ({
      id: type.id,
      name: type.name !== 'Miscellaneous' ? type.name : 'Misc.',
      version: getDamageTypeVersion(type.name),
    }))
    .sort((type1, type2) => type1.name.localeCompare(type2.name));

  dispatch({
    type: SET_DAMAGE_TYPES,
    payload: types,
  });
};

export const setUnitOfMeasurementTypes = (unitTypes: any) => (dispatch) => {
  const types = unitTypes.map((type: any) => ({
    id: type.id,
    name: type.abbreviation,
    fullName: type.name,
  }));

  dispatch({
    type: SET_UNIT_OF_MEASUREMENT_TYPES,
    payload: types,
  });
};

export const setScopeActionTypes = (actionTypes: any) => (dispatch) => {
  dispatch({
    type: SET_SCOPE_ACTION_TYPES,
    payload: actionTypes,
  });
};

export const setCategories = (categories: any) => (dispatch) => {
  dispatch({
    type: SET_CATEGORIES,
    payload: categories,
  });
};

export const setSelectedCategories = (categories: any) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_CATEGORIES,
    payload: categories,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const listPropertyTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`property-types`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setPropertyTypes(data));
    }
  };

export const listAlbumTypes =
  (projectId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`projects/${projectId}/albums`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setAlbumTypes(data));
    }
  };

export const listProjectTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`project-types`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setProjectTypes(data));
    }
  };

export const listUnitOfMeasurementTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`units-of-measurement`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setUnitOfMeasurementTypes(data));
    }
  };

export const listScopeActionTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`scope-actions`));

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setScopeActionTypes(data));
    }
  };

export const getProject =
  (projectId: string, locationParamExists = false) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}`, {
        params: {
          include:
            'company,companyCount,projectStatus,address,addressCount,properties,properties.propertyType,creator,notes,notes_count,all_notes_count,bookmarked_notes_count,flagged_notes_count,photos_count,projectType',
        },
      }),
      FORM_ERRORS,
      FETCHING_PROJECT
    );

    if (response?.data) {
      const { data } = response;

      const {
        id,
        properties,
        address,
        project_status: projectStatus,
        uid,
        alias,
        created_at: createdAt,
        notes,
        notes_count: notesCount,
        all_notes_count: allNotesCount,
        bookmarked_notes_count: bookmarkedNotesCount,
        flagged_notes_count: flaggedNotesCount,
        has_new_damage_types: hasNewDamageTypes,
        company,
        photos_count: photosCount,
        project_type: projectType,
      } = data;

      // project and status object
      dispatch({
        type: SET_PROJECT,
        payload: {
          id,
          uid,
          address,
          projectStatus,
          createdAt,
          notes,
          notesCount,
          allNotesCount,
          bookmarkedNotesCount,
          flaggedNotesCount,
          photosCount,
          projectType,
        },
      });
      if (alias) {
        dispatch(setProjectAlias(alias));
      } else {
        dispatch(setProjectAlias(undefined));
      }

      // used for damage material displays
      dispatch(setProjectHasNewDamageTypes(hasNewDamageTypes));

      // to use in photo select
      dispatch(setProjectPhotosCount(photosCount));

      // properties
      if (properties.length > 0) {
        const [property] = properties;

        if (property.property_type) {
          const { property_type: propertyType } = property;
          // set property
          dispatch(setProperty(property, propertyType));

          // fetch all locations for the given property id
          if (!locationParamExists) {
            const {
              id,
              property_type: { name },
            } = property;
            if (
              trimAndToLowerCase(name) === 'singleunit' ||
              trimAndToLowerCase(name) === 'singlelocation' ||
              trimAndToLowerCase(name) === 'exterior'
            ) {
              dispatch(listPropertyLocations(id));
            }
          }
        } else {
          dispatch(
            // temporary property type for when one hasn't been selected
            setProperty(property, {
              name: 'temp',
            })
          );
        }
      } else {
        dispatch({
          type: SET_PROPERTY,
          payload: undefined,
        });
      }

      // project address
      const { address: projectAddress } = address;

      dispatch(setSimpleProjectAddress(projectAddress));
      dispatch({
        type: FETCHING_PROJECT,
        payload: false,
      });

      // project company info
      const { id: companyId } = company;
      dispatch(setProjectCompanyId(companyId));

      // project availability
      dispatch(setProjectUnavailable(false));
    } else {
      // no data returned, either project doesn't exist or is from a different company
      dispatch(setProjectUnavailable(true));

      // clearing state
      dispatch({
        type: SET_PROJECT,
        payload: undefined,
      });
      dispatch(setSimpleProjectAddress(undefined));
      dispatch(setProjectAlias(undefined));
      dispatch(setProjectHasNewDamageTypes(true));
      dispatch({
        type: SET_PROPERTY,
        payload: undefined,
      });

      dispatch(setProjectCompanyId(undefined));
    }
  };

export const listRoomTypes =
  (property, roomType = 'unit') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const type = roomType.toLocaleLowerCase();

    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`properties/${property}/room-types?filter[type]=${type}`, {
        params: {
          include: 'rooms_count',
        },
      })
    );

    if (response?.data) {
      const { data } = response;

      if (type === 'unit') {
        dispatch(setRoomTypes(SET_UNIT_ROOM_TYPES, data));
      } else if (type === 'commercial') {
        dispatch(setRoomTypes(SET_COMMERCIAL_ROOM_TYPES, data));
      } else if (type === 'single-location') {
        const [first] = data;
        dispatch(setRoomTypes(SET_SINGLE_LOCATION_ROOM_TYPES, first));
      } else if (type === 'industrial') {
        dispatch(setRoomTypes(SET_INDUSTRIAL_ROOM_TYPES, data));
      } else if (type === 'external') {
        dispatch(setRoomTypes(SET_EXTERIOR_ROOM_TYPES, data));
      } else if (type === 'floor') {
        dispatch(setRoomTypes(SET_FLOOR_ROOM_TYPES, data));
      } else if (type === 'single-external') {
        dispatch(setRoomTypes(SET_SINGLE_UNIT_EXTERIOR_ROOM_TYPES, data));
      } else {
        dispatch(setRoomTypes(SET_MULTI_UNIT_EXTERIOR_ROOM_TYPES, data));
      }
    }
  };

export const listRoomLevels =
  (propertyId: number, levelType = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`properties/${propertyId}/levels`, {
        params: {
          include: 'rooms_count',
          'filter[type]': levelType,
        },
      })
    );

    if (response?.data?.length > 0) {
      const { data: levels } = response;

      if (levelType === 'external') {
        dispatch(setRoomLevelsForContainers(SET_EXTERIOR_LEVEL_TYPES, levels));

        // ground level is the default for exterior type
        dispatch({
          type: SET_DEFAULT_EXTERIOR_LEVEL_ID,
          payload: levels.find((level: any) => trimAndToLowerCase(level.name) === 'groundlevel')?.id,
        });
      } else {
        dispatch(setRoomLevelsForContainers(SET_LEVEL_TYPES, levels));

        // main level is considered as default level
        dispatch({
          type: SET_DEFAULT_ROOM_LEVEL_ID,
          payload: levels.find((level: any) => trimAndToLowerCase(level.name) === 'mainlevel')?.id,
        });
      }

      // set room levels for room buttons level groups
      dispatch(setRoomLevels(levels));
    }
  };

export const listGeneralRoomLevels =
  (projectId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/properties`, {
        params: {
          include: 'levels',
        },
      })
    );

    if (response?.data?.length > 0) {
      const { data: properties } = response;
      const [property] = properties;
      const { levels } = property;

      // set room levels for room buttons level groups
      dispatch(setLevelForButtons(levels));
    }
  };

export const listPropertyLocations =
  (propertyId: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/properties/${propertyId}/locations`, {
        params: {
          include: 'locationType,photos_count',
        },
      }),
      FORM_ERRORS,
      FETCHING_LOCATIONS
    );

    if (response?.data?.length > 0) {
      const { data: locations } = response;
      const [location] = locations;

      // this will be used on single unit
      dispatch({
        type: SET_LOCATION,
        payload: location,
      });
      const { photos_count: photosCount } = location;

      dispatch(setLocationsPhotosCount(photosCount));

      dispatch(setLocationCreated(false));
    } else {
      // clear state
      dispatch({
        type: SET_LOCATION,
        payload: undefined,
      });
    }
  };

export const togglePhotoBookmark =
  (photoId: number, setPhotoEdited: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`photos/${photoId}/toggle-bookmark`, {}));

    if (response?.data) {
      const { data } = response;
      setPhotoEdited(data);
    }
  };

export const togglePhotoFlag =
  (photoId: number, setPhotoEdited: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.put(`photos/${photoId}/toggle-flag`, {}));

    if (response?.data) {
      const { data } = response;
      setPhotoEdited(data);
    }
  };

export const listDamageTypes =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`/damage-types`));
    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch(setDamageTypes(data));
    }
  };

export const listDamagedMaterials =
  (projectId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/projects/${projectId}/damage-materials`, {
        params: {
          include: 'damageType',
        },
      })
    );
    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_DAMAGED_MATERIALS,
        payload: data,
      });
    } else {
      dispatch({
        type: SET_DAMAGED_MATERIALS,
        payload: [],
      });
    }
  };

export const listRoomNotesCategories =
  () =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`/categories`));
    if (response?.data?.length > 0) {
      const { data } = response;
      const damageCategory = data.find((e) => e.name === 'damage');
      const photoCategory = data.find((e) => e.name === 'photo');
      dispatch(
        setCategories({
          damage: damageCategory?.id || 0,
          photo: photoCategory?.id || 0,
        })
      );
    }
  };
