/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SET_MENU_ITEMS = 'SET_MENU_ITEMS';
export const FETCHING_ITEMS = 'FETCHING_ITEMS';

interface ActionTypes {
  SET_MENU_ITEMS: any[];
  FETCHING_ITEMS: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any[];
}

export type setMenuItemActionTypes = MessageAction;

export const listMenuItems =
  (uuid: string | number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/photo-share/${uuid}/all-locations`, {
        params: {
          include: 'locationType',
          sort: '-floor_number,location_type',
        },
      }),
      FORM_ERRORS,
      FETCHING_ITEMS
    );

    if (response?.data?.length > 0) {
      const { data } = response;

      dispatch({
        type: SET_MENU_ITEMS,
        payload: data,
      });
    } else {
      dispatch({
        type: SET_MENU_ITEMS,
        payload: [],
      });
    }
  };

// for internal call with no redux variable
export const listAllRooms =
  (uuid: string, id: number, setRooms: any, setFetching) =>
  async (dispatch: any, _getState = null, utils: any) => {
    setFetching(true);
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`/photo-share/${uuid}/locations/${id}/rooms`, {
        params: {
          include: 'roomType,level',
          limit: 30,
          sort: 'level_id',
        },
      })
    );
    if (response?.data) {
      const { data } = response;

      setRooms(data);
      setFetching(false);
    }
  };
