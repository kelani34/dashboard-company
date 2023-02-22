export const totalRoomsSelector = ({ roomButtons: { totalRooms: value = 0 } }) => value;
export const totalAllRoomsSelector = ({ roomButtons: { totalAllRooms: value = 0 } }) => value;
export const levelRoomsSelector = ({ roomButtons: { levelRooms: value = [] } }) => value;
export const currentPageSelector = ({ roomButtons: { currentPage: value = 1 } }) => value;
export const lastPageSelector = ({ roomButtons: { lastPage: value = 1 } }) => value;
export const fetchingRoomButtonsSelector = ({ roomButtons: { fetchingRoomButtons: value = false } }) => value;
export const selectedRoomIdSelector = ({ roomButtons: { selectedRoomId: value } }) => value;
export const roomLevelsSelector = ({ roomButtons: { roomLevels: value = [] } }) => value;
