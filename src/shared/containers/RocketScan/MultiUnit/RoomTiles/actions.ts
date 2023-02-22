import { handleApiRequest } from 'Utils/handleApiRequest';

/*
 * API THUNKS
 * */

/* eslint-disable */

export const listLocationRoomTiles =
  (locationId: number, pageNumber = 1) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`/locations/${locationId}/rooms`, {
        params: {
          include: 'roomType,level,photosCount,thumbnail,photos,photos_count',
          sort: 'level_id',
          page: pageNumber,
        },
      })
    );
  };
