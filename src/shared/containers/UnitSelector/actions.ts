import { handleApiRequest } from 'Utils/handleApiRequest';

export const SET_UNITS = 'SET_UNITS';

interface ActionTypes {
  SET_UNITS: any[];
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any[];
}

export type setUnitActionTypes = MessageAction;

export const setUnits =
  (propertyId: string | number) =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  // @ts-ignore
  //  Linter is choking on _getState not being used
  // eslint-disable-next-line
  async (dispatch: any, _getState = null, utils: any) => {
    const { data } = await handleApiRequest(
      dispatch,
      utils.Api.get(`/properties/${propertyId}/units`, { params: { include: 'rooms,rooms.roomType,rooms.level' } })
    );

    if (data?.length > 0) {
      dispatch({
        type: SET_UNITS,
        payload: data,
      });
    }
  };

export const clearUnits = () => async (dispatch) => {
  dispatch({
    type: SET_UNITS,
    payload: [],
  });
};
