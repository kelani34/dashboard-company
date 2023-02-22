import { handleApiRequest } from 'Utils/handleApiRequest';

/*
 * API THUNKS
 * */

/* eslint-disable */

export const listPendingRoomAssemblies =
  (room_id: number) =>
  async (dispatch: any, _getState = null, utils: any) => {
    return await handleApiRequest(
      dispatch,
      utils.Api.get(`rooms/${room_id}/photo-assemblies`, {
        params: {
          'filter[status]': 'WEBHOOK_PROCESSING',
          limit: 1,
        },
      })
    );
  };
