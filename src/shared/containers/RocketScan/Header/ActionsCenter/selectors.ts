export const selectPhotosModeSelector = ({ rocketScanActionsCenter: { selectPhotosMode: value = false } }: any) =>
  value;
export const selectAllModeSelector = ({ rocketScanActionsCenter: { selectAllMode: value = false } }: any) => value;
export const selectedPhotosSelector = ({ rocketScanActionsCenter: { selectedPhotoIds: value = [] } }: any) => value;
export const unSelectedPhotosSelector = ({ rocketScanActionsCenter: { unSelectedPhotoIds: value = [] } }: any) => value;
export const photosDeletedSelector = ({ rocketScanActionsCenter: { photosDeleted: value = false } }) => value;

export const emailErrorSelector = ({ rocketScanActionsCenter: { photoShareErrors } }: any) =>
  photoShareErrors?.email || [];

export const photoShareLinkSelector = ({ rocketScanActionsCenter: { photoShareLink: value = '' } }) => value;
export const photoShareSelector = ({ rocketScanActionsCenter: { photoShare: value = [] } }: any) => value;
export const sendPhotoShareSelector = ({ rocketScanActionsCenter: { sent: value = false } }) => value;
export const selectedRoomsSelector = ({ rocketScanActionsCenter: { selectedRooms: value = [] } }: any) => value;
export const unSelectedRoomsSelector = ({ rocketScanActionsCenter: { unSelectedRooms: value = [] } }: any) => value;
export const photosCountSelector = ({ rocketScanActionsCenter: { photosCount: value = 0 } }: any) => value;
export const projectPhotosCountSelector = ({ rocketScanActionsCenter: { projectPhotosCount: value = 0 } }: any) =>
  value;
export const locationsPhotosCountSelector = ({ rocketScanActionsCenter: { locationsPhotosCount: value = 0 } }: any) =>
  value;
