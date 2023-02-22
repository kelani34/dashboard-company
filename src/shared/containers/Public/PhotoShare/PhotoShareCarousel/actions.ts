/* eslint-disable */

import { handleApiRequest } from 'Utils/handleApiRequest';
import { FORM_ERRORS } from 'Containers/Core/actions';
import {
  FETCHING_PHOTOS,
  PHOTOS,
  setCarouselCurrentPage,
  setCarouselLastPage,
  setCarouselPhoto,
  setCarouselPhotosTotal,
} from 'Containers/PhotoViewCarousel/actions';

export const listPhotoShareCarouselPhotos =
  (uuid: string, paginatedFromId: string, pageNumber = 1, limit = 1) =>
  async (dispatch, _getState = null, utils) => {
    const response = await handleApiRequest(
      dispatch,
      utils.Api.get(`photo-share/${uuid}/location-photos`, {
        params: {
          include: 'photo,albums,notes,notes_count,photoable.roomType,photoable.level,photoable.location',
          paginate_from_id: paginatedFromId,
          sort: '-floor_number,location_type,location_name,-room,album,-created_at',
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
