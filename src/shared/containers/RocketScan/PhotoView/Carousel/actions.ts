import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_ROCKET_SCAN_PHOTOS = 'SET_ROCKET_SCAN_PHOTOS';
export const SET_ROCKET_SCAN_SELECTED_PHOTO = 'SET_ROCKET_SCAN_SELECTED_PHOTO';
export const SET_META_DATA = 'SET_META_DATA';
export const FETCHING_ROCKET_SCAN_PHOTOS = 'FETCHING_ROCKET_SCAN_PHOTOS';
export const SET_ROCKETSCAN_ROUTE_PATH = 'SET_ROCKETSCAN_ROUTE_PATH';

interface ActionTypes {
  SET_ROCKET_SCAN_PHOTOS: any[];
  SET_ROCKET_SCAN_SELECTED_PHOTO: any;
  SET_META_DATA: any;
  FETCHING_ROCKET_SCAN_PHOTOS: boolean;
  SET_ROCKETSCAN_ROUTE_PATH: string;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type carouselActionTypes = MessageAction;

export const setCarouselRoutePath = (value: string) => (dispatch) => {
  dispatch({
    type: SET_ROCKETSCAN_ROUTE_PATH,
    payload: value,
  });
};

/* eslint-disable */

export const listCarouselPhotos =
  (projectId: string, paginatedFromId: string, pageNumber = 1, limit = 1) =>
  async (dispatch, _getState = null, utils) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/projects/${projectId}/location-photos`, {
        params: {
          include: 'photo,albums,notes,notes_count,photoable.roomType,photoable.level,photoable.location, creator',
          paginate_from_id: paginatedFromId,
          sort: '-floor_number,location_type,-location_name,room_level,room,album,-created_at',
          page: pageNumber,
          limit,
        },
      }),
      FORM_ERRORS,
      FETCHING_ROCKET_SCAN_PHOTOS
    );

    if (response?.data?.length > 0) {
      const { data: photos, meta } = response;
      const { current_page: currentPage, last_page: lastPage, total } = meta;
      const [photo] = photos;

      // set photos
      dispatch({
        type: SET_ROCKET_SCAN_PHOTOS,
        payload: photos,
      });

      // set selected photo
      dispatch({
        type: SET_ROCKET_SCAN_SELECTED_PHOTO,
        payload: photo,
      });

      // set meta data
      dispatch({
        type: SET_META_DATA,
        payload: {
          currentPage,
          lastPage,
          total,
        },
      });
    } else {
      // clear state
      dispatch({
        type: SET_ROCKET_SCAN_PHOTOS,
        payload: [],
      });
      dispatch({
        type: SET_ROCKET_SCAN_SELECTED_PHOTO,
        payload: undefined,
      });
    }
  };
