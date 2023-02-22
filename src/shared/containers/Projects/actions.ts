/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';
import { CompanyProjectsModal } from 'Containers/Projects/Modals';
import { RoomModel, RoomTypeModel } from 'Containers/ProjectContent';
import {
  SET_SINGLE_UNIT,
  SET_UNIT,
  SET_FLOOR,
  setUnitCreated,
  setFloorCreated,
  setRoomCreated,
  setSelectedMultiUnit,
} from 'Containers/Project/Unit/actions';
import { setSelectedFloor } from 'Containers/Project/Floor/actions';
import { setSelectedUnitRooms } from 'Containers/Project/Unit/Rooms/actions';

export const PROJECTS_API_ERRORS = 'PROJECTS_API_ERRORS';
export const PROJECTS_CREATED = 'PROJECTS_CREATED';
export const PROJECTS_STATUSES = 'PROJECTS_STATUSES';
export const MY_PROJECTS = 'MY_PROJECTS';
export const WIP_PROJECTS = 'WIP_PROJECTS';
export const COMPLETED_PROJECTS = 'COMPLETED_PROJECTS';
export const FETCHING_MY_PROJECTS = 'FETCHING_MY_PROJECTS';
export const FETCHING_WIP_PROJECTS = 'FETCHING_WIP_PROJECTS';
export const FETCHING_COMPLETED_PROJECTS = 'FETCHING_COMPLETED_PROJECTS';
export const FETCHING_PHOTO_DOWNLOAD = 'FETCHING_PHOTO_DOWNLOAD';
export const SELECTED_PROJECT_ID = 'SELECTED_PROJECT_ID';
export const SET_ROOM_TYPES = 'SET_ROOM_TYPES';
export const SET_ROOMS = 'SET_ROOMS';
export const SET_ROOM_PHOTOS = 'SET_ROOM_PHOTOS';
export const ROOMS_CREATED = 'ROOMS_CREATED';
export const ADD_PROPERTY_AND_UNIT = 'ADD_PROPERTY_AND_UNIT';
export const ADD_PROPERTY_AND_FLOOR = 'ADD_PROPERTY_AND_FLOOR';
export const SET_SELECTED_ROOM_ID = 'SET_SELECTED_ROOM_ID';
export const SET_SELECTED_UNIT_ID = 'SET_SELECTED_UNIT_ID';
export const SET_SHOW_PHOTO_DOWNLOAD_MODAL = 'SET_SHOW_PHOTO_DOWNLOAD_MODAL';
export const SET_PREPARING_PHOTO_DOWNLOAD = 'SET_PROJECT_PHOTOS_DOWNLOADED';
export const PROJECT_INFO_CLEARED = 'PROJECT_INFO_CLEARED';

export type SetRoomActionTypes = MessageAction;

interface ActionTypes {
  PROJECTS_API_ERRORS: any;
  PROJECTS_CREATED: number;
  PROJECTS_STATUSES: boolean;
  MY_PROJECTS: Array<CompanyProjectsModal>;
  WIP_PROJECTS: Array<CompanyProjectsModal>;
  COMPLETED_PROJECTS: Array<CompanyProjectsModal>;
  FETCHING_MY_PROJECTS: boolean;
  FETCHING_WIP_PROJECTS: boolean;
  FETCHING_COMPLETED_PROJECTS: boolean;
  FETCHING_PHOTO_DOWNLOAD: boolean;
  SELECTED_PROJECT_ID: number;
  SET_ROOM_TYPES: Array<RoomTypeModel>;
  SET_ROOMS: Array<RoomModel>;
  ADD_PROPERTY_AND_UNIT: any;
  ADD_PROPERTY_AND_FLOOR: any;
  SET_SELECTED_ROOM_ID: string | number;
  SET_SELECTED_UNIT_ID: string | number;
  SET_SHOW_PHOTO_DOWNLOAD_MODAL: boolean;
  SET_PROJECT_PHOTOS_DOWNLOADED: boolean;
  PROJECT_INFO_CLEARED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setProjectActionTypes = MessageAction;

export const projectsCreate =
  (requestData = {}, url: string, type = 'post') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api[type](url, requestData));
    if (response?.data) {
      const data = response.data;
      dispatch(setProjectCreated(data.id));
    }
  };

export const listUserProjects =
  (userId: number, sort = '-created_at', page = 1, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`users/${userId}/projects?filter[status]=1`, {
        params: {
          include: 'projectStatus,company,address,units_count,floors_count,photos_count,creator',
          sort,
          page,
          'filter[search]': searchValue,
        },
      }),
      '',
      FETCHING_MY_PROJECTS
    );

    dispatch({
      type: MY_PROJECTS,
      payload: response,
    });
  };

// list the company projects that the users have created
export const listCompanyMyProjects =
  (companyId: number, userId: number, sort = '-created_at', page = 1, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`companies/${companyId}/projects?filter[status]=1&filter[creator]=${userId}`, {
        params: {
          include: 'projectStatus,company,address,units_count,floors_count,photos_count,creator',
          sort,
          page,
          'filter[search]': searchValue,
        },
      }),
      '',
      FETCHING_MY_PROJECTS
    );

    dispatch({
      type: MY_PROJECTS,
      payload: response,
    });
  };

// list the company's projects
export const listCompanyWipProjects =
  (companyId: number, sort = '-created_at', page = 1, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`companies/${companyId}/projects?filter[status]=1`, {
        params: {
          include: 'projectStatus,company,address,units_count,floors_count,photos_count,creator',
          sort,
          page,
          'filter[search]': searchValue,
        },
      }),
      '',
      FETCHING_WIP_PROJECTS
    );

    dispatch({
      type: WIP_PROJECTS,
      payload: response,
    });
  };

export const listCompanyWipProjectsForDashboard =
  (companyId: number, sort = '-created_at', page = 1, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`companies/${companyId}/projects?filter[status]=1`, {
        params: {
          include: 'projectStatus,company,address,units_count,floors_count,photos_count,creator',
          sort,
          page,
          'filter[search]': searchValue,
        },
      }),
      '',
      FETCHING_MY_PROJECTS
    );

    dispatch({
      type: MY_PROJECTS,
      payload: response,
    });
  };

export const listCompanyCompletedProjects =
  (companyId: number, sort = '-created_at', page = 1, searchValue = '') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`companies/${companyId}/projects?filter[status]=2`, {
        params: {
          include: 'projectStatus,company,address,units_count,floors_count,photos_count,creator',
          sort,
          page,
          'filter[search]': searchValue,
        },
      }),
      '',
      FETCHING_COMPLETED_PROJECTS
    );

    dispatch({
      type: COMPLETED_PROJECTS,
      payload: response,
    });
  };

export const listProjectsStatuses =
  (requestData = {}, url = 'project-statuses', type = 'get') =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    dispatch({
      type: PROJECTS_STATUSES,
      payload: response,
    });
  };

export const downloadProjectPhotos =
  (projectId: number, size: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`/projects/${projectId}/photos/export`, { size }),
      '',
      FETCHING_PHOTO_DOWNLOAD
    );

    if (!response?.message) {
      dispatch(setPreparingPhotoDownload(true));
    }
  };

/*
 * Non API thunks
 * */

export const setProjectCreated = (projectId: string | number) => async (dispatch: any) => {
  dispatch({
    type: PROJECTS_CREATED,
    payload: projectId,
  });
};

export const setProjectInfoCleared = (value: boolean) => (dispatch) => {
  dispatch({
    type: PROJECT_INFO_CLEARED,
    payload: value,
  });
};

//Make the call for the propertyId here?  Or where they select the unit?
/*
  Make this a thunk.
  Fetch all the data for the project.
  /api/properties/{property}?include=project,propertyType,floors,subProjects,units
*/
export const setSelectedProjectId = (projectId: string | number) => async (dispatch: any) => {
  //Set the selected project in state
  dispatch({
    type: SELECTED_PROJECT_ID,
    payload: projectId,
  });
};

//selectedProjectId, projectAddress?.address?.address, unitType.singleUnit
export const setUnitType =
  (projectId: string | number, unitName: string, property_type_id: number, property = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // we need to use same property for multi unites
    const propertyExits = Object.keys(property).length > 0;
    let newPropertyData: any = propertyExits ? property : null;

    //create a new property for the project
    if (!propertyExits) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api['post'](`/projects/${projectId}/properties`, { property_type_id })
      );

      if (response?.data) {
        const { data } = response;

        newPropertyData = data;
      }
    }

    if (newPropertyData) {
      //Create a unit for the property, using the address in the name field
      const newUnit = await handleApiRequest(
        dispatch,
        utils.Api['post'](`properties/${newPropertyData.id}/units`, { name: unitName })
      );

      if (newUnit?.data) {
        const { data: newUnitData } = newUnit;

        if (newUnitData) {
          //Add the rooms
          newUnitData.rooms = []; //This will hold future rooms

          //Add the units
          newPropertyData.units = {};
          newPropertyData.units[newUnitData.id] = newUnitData;

          dispatch({
            type: ADD_PROPERTY_AND_UNIT,
            payload: {
              projectId: projectId,
              selectedUnitId: newUnitData.id,
              newProperty: newPropertyData,
            },
          });

          // set the unit data for project header on add rooms and photos photo
          dispatch({
            type: SET_UNIT,
            payload: newUnitData,
          });

          if (!propertyExits) {
            dispatch({
              type: SET_SINGLE_UNIT,
              payload: newUnitData,
            });
          }

          // set unit data, used in multi unit header and content
          dispatch(
            setSelectedMultiUnit({
              ...newUnitData,
              type: 'unit',
            })
          );

          dispatch(setSelectedUnitRooms([]));
          dispatch(setUnitCreated(true));
        }
      }
    }
  };

export const setFloorType =
  (projectId: string | number, floorName: string, property_type_id: number, property = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // we need to use same property for multi unites
    const propertyExits = Object.keys(property).length > 0;
    let newPropertyData: any = propertyExits ? property : null;

    //create a new property for the project
    if (!propertyExits) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api['post'](`/projects/${projectId}/properties`, { property_type_id })
      );

      if (response?.data) {
        const { data } = response;

        newPropertyData = data;
      }
    }

    if (newPropertyData) {
      //Create a unit for the property, using the address in the name field
      const newFloor = await handleApiRequest(
        dispatch,
        utils.Api['post'](`properties/${newPropertyData.id}/floors`, { name: floorName })
      );

      if (newFloor?.data) {
        const { data: newFloorData } = newFloor;

        if (newFloorData) {
          //Add the rooms
          newFloorData.rooms = []; //This will hold future rooms
          newFloorData.name = floorName;

          //Add the units
          newPropertyData.floors = {};
          newPropertyData.floors[newFloorData.id] = newFloorData;

          dispatch({
            type: ADD_PROPERTY_AND_FLOOR,
            payload: {
              projectId: projectId,
              selectedFloorId: newFloorData.id,
              newProperty: newPropertyData,
            },
          });

          // set the floor data for project header on add rooms and photos photo
          dispatch({
            type: SET_FLOOR,
            payload: newFloorData,
          });

          // set unit data, used in multi unit header and content
          dispatch(
            setSelectedMultiUnit({
              ...newFloorData,
              type: 'floor',
            })
          );

          dispatch(setSelectedUnitRooms([]));
          dispatch(setFloorCreated(true));
          dispatch(setSelectedFloor(newFloorData));
        }
      }
    }
  };

export const listRoomTypes =
  (url = 'room-types', type = 'get', requestData = {}) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api[type](url, requestData));

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_ROOM_TYPES,
        payload: data,
      });
    }
  };

export const listRooms =
  (unitId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api['get'](`units/${unitId}/rooms?sort=level_id`, { include: 'roomType,level' })
    );

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_ROOMS,
        payload: data,
      });
    }
  };

export const listRoomPhotos =
  (roomId: string) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api['get'](`rooms/${roomId}/photos`, {}));

    if (response?.data) {
      const { data } = response;

      dispatch({
        type: SET_ROOM_PHOTOS,
        payload: data,
      });
    }
  };

export const setSelectedRoomId = (roomId: string) => ({
  type: SET_SELECTED_ROOM_ID,
  payload: roomId,
});

export const createRoom =
  // (selectedUnitId: number, selectedRoomType: string, selectedRoomName) =>


    (selectedUnitId: number, selectedRoom: any) =>
    async (dispatch: any, _getState = null, utils: any) => {
      /*
                              Use the projectId to get the selected Project.
                              Then I need to lookup the unit Id???

                              make an api call to create the room in
                                /units/${selectedUnitId}/rooms

                              Whatever the response is, add it to the rooms property, along with the empty photos array

                            const project = state.myProjects.data.find((project) => project.id === projectId);
                        */

      const room = await handleApiRequest(
        dispatch,
        utils.Api['post'](`/units/${selectedUnitId}/rooms`, {
          room_type_id: selectedRoom.id,
        })
      );

      //Add the room data to the rooms of the associated project unit
      const { data } = room;
      if (data) {
        //Add the room date to the room.  Remove any white space in the name. Spaces will break theicons
        data.name = selectedRoom.name;
        dispatch({
          type: SET_ROOMS,
          payload: data,
        });

        data.room_type = {};
        data.photos = [];
        data.room_type.name = selectedRoom.name;

        dispatch(setSelectedUnitRooms([data]));
        dispatch(setRoomCreated(data.id));
      }
    };

export const setUnitRooms = (rooms: any[]) => async (dispatch) => {
  if (rooms.length > 0) {
    const roomsMapped = rooms.map((room: any) => {
      return {
        ...room,
        name: room.room_type.name,
      };
    });

    roomsMapped.forEach((room: any) => {
      dispatch({
        type: SET_ROOMS,
        payload: room,
      });
    });
  }
};

export const setShowPhotoDownloadModal = (projectId: number) => (dispatch) => {
  dispatch({
    type: SET_SHOW_PHOTO_DOWNLOAD_MODAL,
    payload: projectId,
  });
};

export const setPreparingPhotoDownload = (state: boolean) => (dispatch) => {
  dispatch({
    type: SET_PREPARING_PHOTO_DOWNLOAD,
    payload: state,
  });
};
