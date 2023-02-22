import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

export const selectedPhotoSelector = ({ photoviewcarousel: { selectedPhoto: value = <PhotoModal>{} } }: any) => value;
export const photosSelector = ({ photoviewcarousel: { photos: value = <Array<PhotoModal>>[] } }: any) => value;
export const currentPageSelector = ({ photoviewcarousel: { currentPage: value = 1 } }: any) => value;
export const lastPageSelector = ({ photoviewcarousel: { lastPage: value = 1 } }: any) => value;
export const totalPhotosSelector = ({ photoviewcarousel: { total: value = 0 } }: any) => value;
export const fetchingPhotosSelector = ({ photoviewcarousel: { fetchingPhotos: value = true } }: any) => value;
export const carouselPhotoDeletedSelector = ({ photoviewcarousel: { photoDeleted: value = false } }: any) => value;
