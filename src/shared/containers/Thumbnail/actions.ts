/* eslint-disable */
import { handleApiRequest } from 'Utils/handleApiRequest';
import { setRefreshRoomPhotos } from 'Containers/RocketScan/RoomsView/RoomContent/Gallery/DropZone/actions';

export const DELETE_PHOTO = 'DELETE_PHOTO';
export const PHOTO_DELETED = 'PHOTO_DELETED';

export type DeletePhotoActionTypes = MessageAction;

interface ActionTypes {
  DELETE_PHOTO: string;
  PHOTO_DELETED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: number;
}

export const deletePhoto =
  (id: number, setRefreshOnDelete = undefined) =>
  async (dispatch: any, _getState = null, utils: any) => {
    // Ensure we have an id
    if (id) {
      const response = await handleApiRequest(dispatch, utils.Api.delete(`/photos/${id}`, {}));

      if (typeof response === 'string') {
        dispatch(setDeletedPhoto(id.toString()));
        if (setRefreshOnDelete) {
          setRefreshOnDelete(true);
        }
      }
    }
  };

/*
 * NON API THUNKS
 * */

export const setDeletedPhoto =
  (value = '') =>
  async (dispatch: any) => {
    dispatch({
      type: PHOTO_DELETED,
      payload: value,
    });
  };
