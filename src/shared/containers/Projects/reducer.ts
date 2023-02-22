import {
  WIP_PROJECTS,
  PROJECTS_API_ERRORS,
  PROJECTS_CREATED,
  PROJECTS_STATUSES,
  setProjectActionTypes,
  MY_PROJECTS,
  COMPLETED_PROJECTS,
  FETCHING_MY_PROJECTS,
  FETCHING_COMPLETED_PROJECTS,
  FETCHING_WIP_PROJECTS,
  FETCHING_PHOTO_DOWNLOAD,
  SELECTED_PROJECT_ID,
  SET_ROOMS,
  ADD_PROPERTY_AND_UNIT,
  ADD_PROPERTY_AND_FLOOR,
  SET_SELECTED_ROOM_ID,
  SET_SELECTED_UNIT_ID,
  SET_SHOW_PHOTO_DOWNLOAD_MODAL,
  SET_PREPARING_PHOTO_DOWNLOAD,
  PROJECT_INFO_CLEARED,
} from 'Containers/Projects/actions';

const initialState = {
  projectsErrors: {},
  projectCreated: undefined,
  projectStatuses: [],
  myProjects: { data: [] },
  wipProjects: {},
  completedProjects: {},
  fetchingMyProjects: false,
  fetchingWipProjects: false,
  fetchingCompletedProjects: false,
  fetchingPhotoDownload: false,
  selectedProjectId: undefined,
  selectedPropertyId: undefined,
  selectedUnitId: undefined,
  selectedFloorId: undefined,
  setSelectedRoomId: undefined,
  property: {},
  photoDownloadProject: undefined,
  preparingPhotoDownload: false,
  projectInfoCleared: false,
};

export const projectsReducer = (state = initialState, action: setProjectActionTypes) => {
  switch (action.type) {
    case PROJECTS_API_ERRORS: {
      return {
        ...state,
        projectsErrors: action.payload,
      };
    }
    case PROJECTS_CREATED: {
      return {
        ...state,
        projectCreated: action.payload,
      };
    }
    case PROJECTS_STATUSES: {
      return {
        ...state,
        projectStatuses: action.payload,
      };
    }
    case MY_PROJECTS: {
      return {
        ...state,
        myProjects: action.payload,
      };
    }
    case WIP_PROJECTS: {
      return {
        ...state,
        wipProjects: action.payload,
      };
    }
    case COMPLETED_PROJECTS: {
      return {
        ...state,
        completedProjects: action.payload,
      };
    }
    case FETCHING_MY_PROJECTS: {
      return {
        ...state,
        fetchingMyProjects: action.payload,
      };
    }
    case FETCHING_WIP_PROJECTS: {
      return {
        ...state,
        fetchingWipProjects: action.payload,
      };
    }
    case FETCHING_COMPLETED_PROJECTS: {
      return {
        ...state,
        fetchingCompletedProjects: action.payload,
      };
    }
    case FETCHING_PHOTO_DOWNLOAD: {
      return {
        ...state,
        fetchingPhotoDownload: action.payload,
      };
    }
    case SELECTED_PROJECT_ID: {
      return {
        ...state,
        selectedProjectId: action.payload,
      };
    }
    case ADD_PROPERTY_AND_UNIT: {
      // projectId keeps showing up as undefined.  TODO:  find out why
      // const { projectId, selectedUnitId, newProperty } = action.payload;
      // Running into strange behaviour in FF and Chome.  projectId is alway undefined is destructuring is used.

      const projectId = action.payload.projectId;
      const selectedUnitId = action.payload.selectedUnitId;
      const selectedFloorId = undefined;
      const newProperty = action.payload.newProperty;

      // Make a copy of the project
      const myProjects = { ...state.myProjects };

      // Find the targetNode
      const targetProject = myProjects.data.find((project: any) => project.id.toString() === projectId); // coerce to a string

      // Add the propertyId and unit
      const propertyId = newProperty.id;
      // check if the propertyId already exists
      const existingProperty = targetProject.propertyIds[propertyId];

      // We don't want to overwrite anything previously created.
      targetProject.propertyIds[propertyId] = existingProperty ? { ...existingProperty, ...newProperty } : newProperty;

      return {
        ...state,
        myProjects: { ...state.myProjects, ...myProjects },
        selectedPropertyId: propertyId,
        selectedUnitId,
        selectedFloorId,
      };
    }
    case ADD_PROPERTY_AND_FLOOR: {
      // projectId keeps showing up as undefined.  TODO:  find out why
      // const { projectId, selectedUnitId, newProperty } = action.payload;
      // Running into strange behaviour in FF and Chome.  projectId is alway undefined is destructuring is used.

      const projectId = action.payload.projectId;
      const selectedUnitId = undefined;
      const selectedFloorId = action.payload.selectedFloorId;
      const newProperty = action.payload.newProperty;

      // Make a copy of the project
      const myProjects = { ...state.myProjects };

      // Find the targetNode
      const targetProject = myProjects.data.find((project: any) => project.id.toString() === projectId); // coerce to a string

      // Add the propertyId and floor
      const propertyId = newProperty.id;
      // check if the propertyId already exists
      const existingProperty = targetProject.propertyIds[propertyId];

      // We don't want to overwrite anything previously created.
      targetProject.propertyIds[propertyId] = existingProperty ? { ...existingProperty, ...newProperty } : newProperty;

      return {
        ...state,
        myProjects: { ...state.myProjects, ...myProjects },
        selectedPropertyId: propertyId,
        selectedUnitId,
        selectedFloorId,
      };
    }
    case SET_ROOMS: {
      const room = action.payload;
      // {"id":71,"is_source":false,"sort_order":null}

      // Make a copy of projects
      const projects = { ...state.myProjects };

      // Find the unit
      const project = projects.data.find((project) => project.id.toString() === state.selectedProjectId);

      const unit = project.propertyIds[state.selectedPropertyId]?.units[state.selectedUnitId];

      if (unit?.id) {
        // Add the rooms arya if it does not exist
        if (!unit?.rooms) {
          unit.rooms = [];
        }

        const unitRoom = unit.rooms.find((unitRoom: any) => room.id === unitRoom.id);

        if (!unitRoom) {
          // Add the current one to the array
          room.photos = {}; // Add the default photos
          unit.rooms = [...unit.rooms, room];
        }
      }

      return {
        ...state,
        myProjects: { ...state.myProjects, ...projects },
      };
    }
    case SET_SELECTED_ROOM_ID: {
      return {
        ...state,
        setSelectedRoomId: action.payload,
      };
    }
    case SET_SELECTED_UNIT_ID: {
      return {
        ...state,
        // {"propertyId":71,"unitId":123}
        selectedPropertyId: action.payload.propertyId,
        selectedUnitId: action.payload.unitId,
      };
    }
    case SET_SHOW_PHOTO_DOWNLOAD_MODAL: {
      return {
        ...state,
        photoDownloadProject: action.payload,
      };
    }
    case SET_PREPARING_PHOTO_DOWNLOAD: {
      return {
        ...state,
        preparingPhotoDownload: action.payload,
      };
    }
    case PROJECT_INFO_CLEARED:
      return {
        ...state,
        projectInfoCleared: action.payload,
      };
    default:
      return state;
  }
};
