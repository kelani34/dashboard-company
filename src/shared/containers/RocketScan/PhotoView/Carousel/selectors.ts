import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

export const rocketScanPhotosSelector = ({ rocketScanCarousel: { photos: value = [] } }: any) => value;
export const selectedPhotoSelector = ({ rocketScanCarousel: { selectedPhoto: value = <PhotoModal>{} } }: any) => value;
export const currentPageSelector = ({ rocketScanCarousel: { currentPage: value = 1 } }: any) => value;
export const lastPageSelector = ({ rocketScanCarousel: { lastPage: value = 1 } }: any) => value;
export const fetchingPhotosSelector = ({ rocketScanCarousel: { fetchingRocketScanPhotos: value = true } }: any) =>
  value;
export const rocketScanRoutePathSelector = ({ rocketScanCarousel: { rocketScanRoutePath: value = '' } }: any) => value;
