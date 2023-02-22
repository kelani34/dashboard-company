import { handleApiRequest } from 'Utils/handleApiRequest';

export const GET_PHOTO_SHARE_LINK = 'GET_PHOTO_SHARE_LINK';
export const SET_SELECT_PHOTOS_MODE = 'SET_SELECT_PHOTOS_MODE';
export const SET_SELECT_ALL_MODE = 'SET_SELECT_ALL_MODE';
export const SET_SELECTED_PHOTO_IDS = 'SET_SELECTED_PHOTO_IDS';
export const SET_UNSELECTED_PHOTO_IDS = 'SET_UNSELECTED_PHOTO_IDS';
export const PHOTOS_DELETED = 'PHOTOS_DELETED';
export const SET_PHOTO_SHARE_SENT = 'SET_PHOTO_SHARE_SENT';
export const PHOTO_SHARE = 'PHOTO_SHARE';
export const PHOTO_SHARE_ERRORS = 'PHOTO_SHARE_ERRORS';
export const SET_SELECTED_ROOMS = 'SET_SELECTED_ROOMS';
export const SET_UNSELECTED_ROOMS = 'SET_UNSELECTED_ROOMS';
export const SET_PHOTO_SHARE_PHOTOS_COUNT = 'SET_PHOTO_SHARE_PHOTOS_COUNT';
export const SET_PROJECT_PHOTOS_COUNT = 'SET_PROJECT_PHOTOS_COUNT';
export const SET_LOCATIONS_PHOTOS_COUNT = 'SET_LOCATIONS_PHOTOS_COUNT';

interface ActionTypes {
  GET_PHOTO_SHARE_LINK: any;
  SET_SELECT_PHOTOS_MODE: boolean;
  SET_SELECT_ALL_MODE: boolean;
  SET_SELECTED_PHOTO_IDS: any[];
  SET_UNSELECTED_PHOTO_IDS: any[];
  PHOTOS_DELETED: boolean;
  SET_PHOTO_SHARE_SENT: boolean;
  PHOTO_SHARE: any;
  PHOTO_SHARE_ERRORS: any;
  SET_SELECTED_ROOMS: any[];
  SET_UNSELECTED_ROOMS: any[];
  SET_PHOTO_SHARE_PHOTOS_COUNT: any[];
  SET_PROJECT_PHOTOS_COUNT: number;
  SET_LOCATIONS_PHOTOS_COUNT: number;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type rocketScanActionCenterActionTypes = MessageAction;

export const setPhotoShareSent = (status: boolean) => async (dispatch: any) => {
  dispatch({
    type: SET_PHOTO_SHARE_SENT,
    payload: status,
  });
};

export const setPhotoShare = (value: any) => (dispatch) => {
  dispatch({
    type: PHOTO_SHARE,
    payload: value,
  });
};

export const setSelectedRooms = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_ROOMS,
    payload,
  });
};

export const setUnSelectedRooms = (payload: any) => (dispatch) => {
  dispatch({
    type: SET_UNSELECTED_ROOMS,
    payload,
  });
};

export const setSelectPhotosMode = (payload: boolean) => (dispatch) => {
  dispatch({
    type: SET_SELECT_PHOTOS_MODE,
    payload,
  });
};

export const setSelectAllMode = (payload: boolean) => (dispatch) => {
  dispatch({
    type: SET_SELECT_ALL_MODE,
    payload,
  });
};
// full object used in SelectedPhoto
export const setSelectedPhotoIds = (payload: any[]) => (dispatch) => {
  dispatch({
    type: SET_SELECTED_PHOTO_IDS,
    payload,
  });
};

export const setUnSelectedPhotoIds = (payload: any[]) => (dispatch) => {
  dispatch({
    type: SET_UNSELECTED_PHOTO_IDS,
    payload,
  });
};

export const setPhotosDeleted = (value: boolean) => (dispatch) => {
  dispatch({
    type: PHOTOS_DELETED,
    payload: value,
  });
};

export const setPhotoSharePhotosCount = (payload: number) => (dispatch) => {
  dispatch({
    type: SET_PHOTO_SHARE_PHOTOS_COUNT,
    payload,
  });
};

export const setProjectPhotosCount = (payload: number) => (dispatch) => {
  dispatch({
    type: SET_PROJECT_PHOTOS_COUNT,
    payload,
  });
};

export const setLocationsPhotosCount = (payload: number) => (dispatch) => {
  dispatch({
    type: SET_LOCATIONS_PHOTOS_COUNT,
    payload,
  });
};

/*
 * API THUNKS
 * */

/* eslint-disable */

export const createPhotoShare =
  (projectId: number, requestData, setLinkGenerated: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`/projects/${projectId}/photo-shares`, requestData)
    );
    if (response?.data) {
      const { data } = response;

      dispatch(setPhotoShare(data));
      setLinkGenerated(true);
    }
  };

// export const getPhotoShareURL =
//   (photoShare: string) =>
//   async (dispatch: any, _getState = null, utils: any) => {
//     const response = await handleApiRequest(dispatch, utils.Api.get(`/photo-shares/${photoShare}`));
//
//     if (response?.data) {
//       const { data } = response;
//       const photoShareLink = data;
//
//       dispatch({
//         type: GET_PHOTO_SHARE_LINK,
//         payload: photoShareLink,
//       });
//     }
//   };

export const sendPhotoShareLink =
  (photoShare: string, requestData) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.post(`/dispatch-photo-share/${photoShare}`, requestData),
      PHOTO_SHARE_ERRORS
    );

    if (typeof response === 'string') {
      dispatch(setPhotoShareSent(true));
    }
  };

export const deleteSelectedPhotos =
  (projectId: number, photos: any, setIsOpenDeleteModal: any) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (projectId) {
      const response = await handleApiRequest(
        dispatch,
        utils.Api.delete(`projects/${projectId}/resource-photos`, {
          params: photos,
        })
      );

      if (typeof response === 'string') {
        dispatch(setPhotosDeleted(true));
        dispatch(setSelectedPhotoIds([]));
        dispatch(setUnSelectedPhotoIds([]));
        setIsOpenDeleteModal(true);
      }
    }
  };

export const refreshDataForPhotoSelection =
  (projectId = null, locationId = null) =>
  async (dispatch: any, _getState = null, utils: any) => {
    if (projectId) {
      const projectResponse = await handleApiRequest(
        dispatch,
        utils.Api.get(`/projects/${projectId}`, {
          params: {
            include: 'photos_count',
          },
        })
      );

      if (projectResponse?.data) {
        const {
          data: { photos_count: photosCount },
        } = projectResponse;
        dispatch(setProjectPhotosCount(photosCount));
      }
    }

    if (locationId) {
      const locationResponse = await handleApiRequest(
        dispatch,
        utils.Api.get(`/locations/${locationId}`, {
          params: {
            include: 'photos_count',
          },
        })
      );

      if (locationResponse?.data) {
        const {
          data: { photos_count: photosCount },
        } = locationResponse;
        dispatch(setLocationsPhotosCount(photosCount));
      }
    }
  };
