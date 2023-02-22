/* eslint-disable */

import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';

export const SELECTED_PHOTO = 'SELECTED_PHOTO';
export const PHOTOS = 'PHOTOS';
export const CURRENT_PAGE = 'CURRENT_PAGE';
export const LAST_PAGE = 'LAST_PAGE';
export const TOTAL = 'TOTAL';
export const FETCHING_PHOTOS = 'FETCHING_PHOTOS';
export const PHOTO_DELETED = 'PHOTO_DELETED';

interface ActionTypes {
  SELECTED_PHOTO: PhotoModal;
  PHOTOS: Array<PhotoModal>;
  CURRENT_PAGE: number;
  LAST_PAGE: number;
  TOTAL: number;
  FETCHING_PHOTOS: boolean;
  PHOTO_DELETED: boolean;
}

interface MessageAction {
  type: keyof ActionTypes;
  payload: any;
}

export type setPhotoViewCarouselActionTypes = MessageAction;

export const listCarouselPhotos =
  (projectId: string, unitType = 'unit', paginatedFromId: string, pageNumber = 1, limit = 1) =>
  async (dispatch, _getState = null, utils) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`projects/${projectId}/${unitType}-photos`, {
        params: {
          include: 'photo,albums,notes,notes_count,photoable.roomType,photoable.level,photoable.morphable',
          paginate_from_id: paginatedFromId,
          sort: `${unitType},room,album`,
          page: pageNumber,
          limit,
        },
      }),
      FORM_ERRORS,
      FETCHING_PHOTOS
    );

    if (response?.data) {
      const { meta, data } = response;
      const { current_page: currentPage, last_page: lastPage, total } = meta;
      const [photo] = data;

      // set selected photo
      dispatch(setCarouselPhoto(photo));

      // set photos for the carousel
      dispatch({
        type: PHOTOS,
        payload: data,
      });

      // set meta data
      dispatch(setCarouselCurrentPage(currentPage));
      dispatch(setCarouselLastPage(lastPage));
      dispatch(setCarouselPhotosTotal(total));
    }
  };

export const deletePhotoFromCarousel =
  (photoId: number) =>
  async (dispatch, _getState = null, utils) => {
    const response = await handleApiRequest(dispatch, utils.Api.delete(`photos/${photoId}`, {}));

    if (response?.data) {
      dispatch(setCarouselPhotoDeleted(true));
    }
  };

/*
 * NON API THUNKS
 * */

export const setCarouselPhoto = (photo: PhotoModal) => async (dispatch) => {
  dispatch({
    type: SELECTED_PHOTO,
    payload: photo,
  });
};

export const setCarouselCurrentPage = (currentPage: number) => async (dispatch) => {
  dispatch({
    type: CURRENT_PAGE,
    payload: currentPage,
  });
};

export const setCarouselLastPage = (lastPage: number) => async (dispatch) => {
  dispatch({
    type: LAST_PAGE,
    payload: lastPage,
  });
};

export const setCarouselPhotosTotal = (total: number) => async (dispatch) => {
  dispatch({
    type: TOTAL,
    payload: total,
  });
};

export const setCarouselPhotoDeleted = (value: boolean) => async (dispatch) => {
  dispatch({
    type: PHOTO_DELETED,
    payload: value,
  });
};
