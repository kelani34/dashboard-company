import { handleApiRequest } from 'Utils/handleApiRequest';

export const SET_LEVEL_TYPES = 'SET_LEVEL_TYPES';
export const SET_DEFAULT_LEVEL = 'SET_DEFAULT_LEVEL';

interface ActionTypes {
  SET_LEVEL_TYPES: any[];
  SET_DEFAULT_LEVEL: number;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any[];
}

export type setLevelActionTypes = MessageAction;

export const setLevelTypes =
  (id: number) =>
  // _getState is prefixed in order to pass linting and the TS compiler.  Remove the _ if you use _getState
  // @ts-ignore
  //  Linter is choking on _getState not being used
  // eslint-disable-next-line
  async (dispatch: any, _getState = null, utils: any) => {
    const response = await handleApiRequest(dispatch, utils.Api.get(`/properties/${id}/levels`));

    if (response?.data?.length > 0) {
      const { data: levels } = response;

      dispatch({
        type: SET_LEVEL_TYPES,
        payload: levels,
      });

      // main level is considered as default level
      dispatch({
        type: SET_DEFAULT_LEVEL,
        payload: levels.find((level: any) => level.name.toString().toLowerCase() === 'main level')?.id,
      });
    }
  };
