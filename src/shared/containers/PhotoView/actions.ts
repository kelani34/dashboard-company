/* eslint-disable */

export const SET_THUMBNAIL_SRC = "SET_THUMBNAIL_SRC";
export const SET_IR_IMAGE = "SET_IR_IMAGE";
export const SET_NOTES = "SET_NOTES";
export const SET_IMAGE_ID = "SET_IMAGE_ID";

interface ActionTypes {
  SET_THUMBNAIL_SRC: string;
  SET_NOTES: any[];
  SET_IR_IMAGE: string;
  SET_IMAGE_ID: number;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setPhotoViewActionTypes = MessageAction;

/*
 * NON API THUNKS
 * */

export const setThumbnailSrc = (src: string) => async (dispatch) => {
  dispatch({
    type: SET_THUMBNAIL_SRC,
    payload: src,
  });
};

export const setIrImageSrc = (src: string) => async (dispatch) => {
  dispatch({
    type: SET_IR_IMAGE,
    payload: src,
  });
};

export const setImageId = (src: string) => async (dispatch) => {
  dispatch({
    type: SET_IMAGE_ID,
    payload: src,
  });
};
