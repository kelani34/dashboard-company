import { combineReducers } from 'redux';

// Import Reducers
import { NavReducer } from 'Containers/Nav';
import { AuthReducer } from 'Containers/Auth';
import { CoreReducer } from 'Containers/Core';
import { SignInHowEmailCheckReducer, SignInHowCompanyInviteReducer } from 'Containers/SignIn/SignInHow';
import { UserReducer } from 'Containers/User';
import { PhoneVerificationReducer } from 'Containers/SignIn/PhoneVerification';
import { ForgotPasswordReducer } from 'Containers/SignIn/ForgotPassword/ForgotPassword';
import { ResetPasswordReducer } from 'Containers/SignIn/ForgotPassword/ResetPassword';
import { SignInEmailReducer } from 'Containers/SignIn/SignInEmail';
import { UserInformationReducer } from 'Containers/SignIn/SignUpUserInformation';
import { PhoneVerificationCodeReducer } from 'Containers/SignIn/PhoneVerificationCode';
import { addressReducer } from 'Containers/Address/reducer';
import { projectsReducer } from 'Containers/Projects/reducer';
import { projectRoomsReducer } from 'Containers/ProjectContent/reducer';
import { photoViewReducer } from 'Containers/PhotoView/reducer';
import { roomsReducer } from 'Containers/Project/Unit/Rooms/reducer';
import { selectedTabReducer } from 'Containers/Project/ProjectTabs/reducer';
import { projectReducer } from 'Containers/Project/reducer';
import { addLocationsReducer } from 'Containers/AddLocationTab';
import { levelTypesReducer } from 'Containers/RocketScan/RoomsView/RoomContent/LevelSelector';
import { menuItemsReducer } from 'Containers/Public/PhotoShare/PhotoShareWrapper/SideBarMenu/reducer';
import { thumbnailReducer } from 'Containers/Thumbnail/reducer';
import { floorReducer } from 'Containers/Project/Floor/reducer';
import { unitsReducer } from 'Containers/Project/Unit/reducer';
import { PhotoErrorToastReducer } from 'Containers/PhotoErrorToast/reducer';
import { PhotoShareReducer } from 'Containers/Public/PhotoShare/reducer';
import { photoViewCarouselReducer } from 'Containers/PhotoViewCarousel/reducer';
import { dropZoneReducer } from 'Containers/DropZone/reducer';
import { dashboardReducer } from 'Containers/Dashboard/reducer';
import { employeesReducer } from 'Containers/People/PeopleTabs/EmployeesTab/reducer';
import { employeeInviteReducer } from 'Containers/InviteEmployees/reducer';
import { contactsReducer } from 'Containers/People/PeopleTabs/ContactsTab/reducer';
import { RocketScanReducer } from 'Containers/RocketScan/reducer';
import { locationsReducer } from 'Containers/RocketScan/MultiUnit/Locations/reducer';
import { roomButtonsReducer } from 'Containers/RocketScan/RoomsView/RoomButtons/reducer';
import { newRoomsReducer } from 'Containers/RocketScan/RoomsView/Rooms/reducer';
import { galleryReducer } from 'Containers/RocketScan/RoomsView/RoomContent/Gallery/reducer';
import { rocketScanCarouselReducer } from 'Containers/RocketScan/PhotoView/Carousel/reducer';
import { companyReducer } from 'Containers/Company/reducers';
import { customRoomReducer } from 'Containers/RocketScan/RoomsView/CreateCustomRoom/reducer';
import { customLevelReducer } from 'Containers/RocketScan/RoomsView/CreateCustomLevel/reducer';
import { photoNotesReducer } from 'Containers/RocketScan/PhotoView/PhotoNotes/reducer';
import { projectNotesReducer } from 'Containers/RocketScan/ProjectNotes/reducer';
import { notesReducer } from 'Containers/Notes/reducer';
import { roomNotesReducer } from 'Containers/RocketScan/RoomsView/RoomNotes/reducer';
import { locationNotesReducer } from 'Containers/RocketScan/MultiUnit/Locations/LocationNotes/reducer';
import { crewReducer } from 'Containers/Crew/reducer';
import { damagedMaterialsReducer } from 'Containers/RocketScan/RoomsView/DamagedMaterials/reducer';
import { rocketScanActionsCenterReducer } from 'Containers/RocketScan/Header/ActionsCenter/reducer';
import { claimsReducer } from 'Containers/ProjectData/ClaimsData/reducers';
import { lossDataReducer } from 'Containers/ProjectData/LossData/reducer';
import { propertyDataReducer } from 'Containers/ProjectData/PropertyData/reducer';
import { reportsReducer } from 'Containers/ReportsAndDocuments';
import { rocketDryReducer } from 'Containers/RocketDry/reducer';

// Combine them
export default combineReducers({
  core: CoreReducer,
  auth: AuthReducer,
  user: UserReducer,
  nav: NavReducer,
  signinhow: SignInHowEmailCheckReducer,
  basicCompanyInfo: SignInHowCompanyInviteReducer,
  phoneVerification: PhoneVerificationReducer,
  phoneVerificationCode: PhoneVerificationCodeReducer,
  forgotPassword: ForgotPasswordReducer,
  resetPassword: ResetPasswordReducer,
  signinemail: SignInEmailReducer,
  userInformation: UserInformationReducer,
  address: addressReducer,
  projects: projectsReducer,
  project: projectReducer,
  projectRooms: projectRoomsReducer,
  photoview: photoViewReducer,
  rooms: roomsReducer,
  singleUnitProjectSelectedTab: selectedTabReducer,
  addLocations: addLocationsReducer,
  levelTypes: levelTypesReducer,
  units: unitsReducer,
  menuItems: menuItemsReducer,
  thumbnail: thumbnailReducer,
  floor: floorReducer,
  photoErrorToast: PhotoErrorToastReducer,
  photoShare: PhotoShareReducer,
  photoviewcarousel: photoViewCarouselReducer,
  dropzone: dropZoneReducer,
  dashboard: dashboardReducer,
  employees: employeesReducer,
  employeeInvite: employeeInviteReducer,
  contacts: contactsReducer,
  rocketScan: RocketScanReducer,
  locations: locationsReducer,
  roomButtons: roomButtonsReducer,
  newRooms: newRoomsReducer,
  gallery: galleryReducer,
  rocketScanCarousel: rocketScanCarouselReducer,
  company: companyReducer,
  customRoom: customRoomReducer,
  customLevel: customLevelReducer,
  photoNotes: photoNotesReducer,
  projectNotes: projectNotesReducer,
  roomNotes: roomNotesReducer,
  locationNotes: locationNotesReducer,
  notes: notesReducer,
  crew: crewReducer,
  damagedMaterials: damagedMaterialsReducer,
  rocketScanActionsCenter: rocketScanActionsCenterReducer,
  claims: claimsReducer,
  lossData: lossDataReducer,
  propertyData: propertyDataReducer,
  reports: reportsReducer,
  rocketDry: rocketDryReducer,
});
