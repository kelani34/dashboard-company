import { format, getUnixTime, parseISO } from 'date-fns';
import * as uuid from 'uuid';
import { parsePhoneNumber, formatPhoneNumberIntl } from 'react-phone-number-input';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';

export const getFirstLetterUppercase = (value: string) => (value ? value.charAt(0).toLocaleUpperCase() : '');
export const convertFirstLetterUppercase = (value: string) =>
  value ? getFirstLetterUppercase(value) + value.slice(1) : '';
export const convertWordsFirstLetterUppercase = (value: string) => {
  if (!value) {
    return '';
  }

  const words = value.split(' ');

  if (words.length === 0) {
    return '';
  }

  return words.map((word: any) => convertFirstLetterUppercase(word)).join(' ');
};

export const formatDate = (dateString: string, dateFormat: string) => format(new Date(dateString), dateFormat);

// convert a date string in ISO 8601 format to a Date object
export const parseISODate = (dateString: string) => parseISO(dateString);

export const getPhotosCount = (albumPhotosCount: number, internalPhotosCount: number) => {
  const result = albumPhotosCount - internalPhotosCount;

  return result !== -1 ? result : 0;
};

export const getUnixTimeFromString = (date: string) => getUnixTime(new Date(date));

export const compareTwoDates = (dateOne: string, dateTwo: string) =>
  getUnixTime(new Date(dateOne)) === getUnixTime(new Date(dateTwo));

export const convertPhoneNumber = (countryCode: string, phone: string) => {
  if (phone && countryCode) {
    let phoneAlt = phone.replace(countryCode, '');
    phoneAlt = phoneAlt.replace(/-/g, '');
    phoneAlt = phoneAlt.replace(/ /g, '');
    phoneAlt = phoneAlt.replace('+', '');

    if (phoneAlt.length < 10) return '';

    if (countryCode && phoneAlt) {
      const phoneNumber = parsePhoneNumber(countryCode + phoneAlt)?.number;
      return phoneNumber;
    }
  }
  return '';
};

export const formatPhoneInternationalWithCountryCode = (countryCode: string, phone: string) => {
  if (phone) {
    return formatPhoneNumberIntl(phone).replace(`${countryCode} `, '');
  }
  return '';
};

export const formatPhoneNumberInternational = (phone: string) => {
  if (phone) {
    return formatPhoneNumberIntl(phone);
  }
  return '';
};

export const formatPhone = (phone) => {
  if (phone) {
    const phoneAlt = phone.replace('+1', '');
    // const phoneAlt = parsePhoneNumber(phone).nationalNumber;
    const part1 = phoneAlt.length > 2 ? phoneAlt.substring(0, 3) : phoneAlt;
    const part2 = phoneAlt.length > 3 ? `-${phoneAlt.substring(3, 6)}` : '';
    const part3 = phoneAlt.length > 6 ? `-${phoneAlt.substring(6, 10)}` : '';

    return `${part1}${part2}${part3}`;
  }
  return '';
};

export const getPhotoShareBreadCrumb = ({ photoable: room, albums }: PhotoModal, showAlbum = true) => {
  const {
    room_type: { name: roomName },
    morphable: unit,
  } = room;
  const { name: unitName } = unit;

  // getting the first album
  const [album] = albums;

  let levelName = '';

  if (room.level && room.level?.name) {
    const { level } = room;
    levelName = level.name;
  }

  return `${unitName} / ${levelName ? `${levelName} / ` : ''} ${roomName} Photos ${
    showAlbum ? `${album?.name} / ` : ''
  }`;
};

export const getPhotoShareAlbum = ({ albums }: PhotoModal) => {
  if (albums.length === 0) {
    return '';
  }
  // getting the first album
  const [album] = albums;
  return `${album.name}`;
};

export const trimAndToLowerCase = (value: string) => value.replace(/\s/g, '').toLocaleLowerCase();

export const floorNumbers = (min = -25, max = 150, step = 1) =>
  Array.from({ length: (max - min) / step + 1 }, (_, i) => min + i).map((item) => ({
    id: item,
    name: `${item}`,
  }));

export const initials = (firstName, lastName) => getFirstLetterUppercase(firstName) + getFirstLetterUppercase(lastName);

export const validateImageFileType = (file) => !!(file.type === 'image/png' || file.type === 'image/jpeg');

export const validateImageResolution = (width, height) => !(width > 4000 || height > 4000);

// text limit for notes dropdown placeholder
export const limitText = (text: string, limit: number) => {
  if (text.length > limit) {
    return `${text.substring(0, limit)}...`;
  }
  return text;
};

// will get auth user details only if the routes are not match to below
export const shouldGetAuth = (pathname) =>
  pathname.includes('/photo-share') ||
  pathname.includes('/reset-password') ||
  pathname.includes('/invite') ||
  pathname.includes('/signinemail') ||
  pathname.includes('/phoneverification') ||
  pathname.includes('/phoneverificationcode');

// add or remove an item from an array
export const addOrRemoveFromArray = (previousItems: any[], newItem: any) => {
  if (typeof newItem === 'object') {
    return previousItems.some((prevItem: any) => prevItem.id.toString() === newItem.id.toString())
      ? previousItems.filter((prevItem: any) => prevItem.id.toString() !== newItem.id.toString())
      : [...previousItems, newItem];
  }

  return previousItems.includes(newItem)
    ? previousItems.filter((prevId: any) => prevId.toString() !== newItem.toString())
    : [...previousItems, newItem];
};

export const getDisplayedRolesArray = (
  allRoles: any,
  excludedRoles = ['super-admin', 'employee'],
  roleRenameMapping = { 'company-admin': 'Admin' }
) => {
  const filteredRoles = allRoles.filter((role) => !excludedRoles.includes(role.name));

  if (filteredRoles.length === 0) {
    return [];
  }

  return filteredRoles.map((role) => ({
    id: role.id,
    name: roleRenameMapping[role.name] ?? role.display_name,
  }));
};

export const checkGalleryEnabled = (albumId: number, photoAlbums: any[]) =>
  photoAlbums?.some((album: any) => album.id === albumId && album.enabled === 1);

export const galleryShouldShow = (
  galleryId: number,
  selectedFilterIds: any[],
  galleryEnabled: boolean,
  isInEditMode: boolean
) => {
  if (selectedFilterIds.length === 0) {
    // only show all galleries in edit mode if the "all photos" filter is selected
    return galleryEnabled || isInEditMode;
  }

  return selectedFilterIds.includes(galleryId) && galleryEnabled;
};

export const chunkArray = (array, size) =>
  array.length <= size ? [array] : [array.slice(0, size), ...chunkArray(array.slice(size), size)];

export const getPhotosChunkSize = (array) => {
  if (array.length <= 20) {
    return 10;
  }
  return Math.round(array.length / 2);
};

export const checkIfPhotoSelected = (
  photo: any,
  selectedPhotos: any[],
  unSelectedPhotos: any[],
  selectPhotosMode: boolean,
  selectAllMode: boolean
) => {
  if (!selectPhotosMode) {
    return false;
  }

  if (selectAllMode) {
    return !unSelectedPhotos.some((item: any) => item.id === photo.id);
  }

  return selectPhotosMode && selectedPhotos.some((item: any) => item.id === photo.id);
};

export const generateUUID = () => uuid.v4();

export const compareArrays = (array1: any[], array2: any[]) => {
  if (array1.length !== array2.length) return false;
  for (let i = 0; i < array1.length; i += 1) {
    if (array1[i] !== array2[i]) return false;
  }
  return true;
};

export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const getTimeout = (length: number) => {
  if (length < 3) {
    return 100;
  }

  if (length < 5) {
    return 300;
  }

  if (length < 10) {
    return 1500;
  }

  return 3000;
};

// download a pdf, or doc etc...
export const download = async (url: string, fileName: string, setLoading: any = undefined) => {
  try {
    const response = await fetch(url);

    const blob = await response.blob();

    const blobUrl = window.URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = blobUrl;
    link.setAttribute('download', fileName);

    // Append to html link element page
    document.body.appendChild(link);

    // Start download
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);

    // clear loading if given
    if (setLoading) setLoading(false);
  } catch (errors: any) {
    setLoading(false);
    alert('Something went wrong. Unable download the file. Please try again later.');
  }
};
