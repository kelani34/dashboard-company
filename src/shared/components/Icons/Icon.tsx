import React, { memo, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { FilterSvg } from 'Components/Icons/Filter';
import { CaretUpSvg } from 'Components/Icons/CaretUp';
import { CaretDownSvg } from 'Components/Icons/CaretDown/CaretDown';
import { ArrowLeftSvg } from 'Components/Icons/ArrowLeft';
import { TrashSvg } from 'Components/Icons/Trash';
import { CarouselControllerSvg } from 'Components/Icons/CarouselController';
import { SupportSvg } from 'Components/Icons/Support';
import { HighriseSvg } from 'Components/Icons/Highrise';
import { ChevronIconsSvg } from 'Components/Icons/ChevronIcons';
import { DownloadSvg } from 'Components/Icons/Download';
import { BookmarkSvg } from 'Components/Icons/Bookmark';
import { SearchSvg } from 'Components/Icons/Search';
import { CircleSvg } from 'Components/Icons/Circle';
import { MobileAppSvg } from 'Components/Icons/MobileApp';
import { CrewSvg } from 'Components/Icons/Crew';
import { CommercialSvg } from 'Components/Icons/Commercial';
import { SquareSvg } from 'Components/Icons/Square';
import { DotSvg } from 'Components/Icons/Dot';
import { ReportsTypeSvg } from 'Components/Icons/ReportsType';
import { RadioSvg } from 'Components/Icons/Radio';
import { AddressBuildingSvg } from './AddressBuilding';
import { PhoneSvg } from './Phone';
import { CompanyArrowSvg } from './CompanyArrow';
import { CubeSvg } from './Cube';
import { CubePlusSvg } from './CubePlus';
import { CubePlusLgSvg } from './CubePlusLarge';
import { PersonSvg } from './Person';
import { HamburgerMenuSvg } from './HamburgerMenu';
import { SideBarCloseSvg } from './SideBarClose';
import { EyeClosedSvg } from './EyeClosed';
import { EyeSvg } from './Eye';
import { DropzoneBackgroundSvg } from './DropzoneBackground';
import { ModalCloseSvg } from './ModalClose';
import { LogoSvg } from './Logo';
import { SmsSvg } from './Sms';
import { EmailSvg } from './Email';
import { AppleSvg } from './Apple';
import { FacebookSvg } from './Facebook';
import { GoogleSvg } from './Google';
import { CloseSvg } from './Close';
import { CloseCircleSvg } from './CloseCircle';
import { SideBarLeftArrowSvg } from './SideBarLeftArrow';
import { SideBarRightArrowSvg } from './SideBarRightArrow';
import { DropdownArrowSvg } from './DropdownArrow';
import { FunnelSvg } from './Funnel';
import { LogoIconSvg } from './LogoIcon';
import { DashboardSvg } from './Dashboard';
import { ProjectsSvg } from './Projects';
import { FormSvg } from './Forms';
import { PeopleSvg, PeoplePinkSvg } from './People';
import { ThreeDotsSvg } from './ThreeDots';
import { PlusSvg } from './Plus';
import { RocketEmblemSvg } from './RocketEmblem';
import { SingleHomeSvg } from './SingleHome';
import { HandSvg } from './Hand';
import { BathRoomSvg } from './BathRoom';
import { BedRoomSvg } from './BedRoom';
import { DenSvg } from './Den';
import { DiningRoomSvg } from './DiningRoom';
import { EnsuiteSvg } from './Ensuite';
import { KitchenSvg } from './Kitchen';
import { LaundrySvg } from './Laundry';
import { LivingRoomSvg } from './LivingRoom';
import { UnitSvg } from './Unit';
import { FloorSvg } from './Floor';
import { HallwaySvg } from './Hallway';
import { StairwaySvg } from './Stairway';
import { ElevatorSvg } from './Elevator';
import { LobbySvg } from './Lobby';
import { StorageSvg } from './Storage';
import { GymSvg } from './Gym';
import { ElectricalRoomSvg } from './ElectricalRoom';
import { ActionsDefaultSvg } from './ActionsDefault';
import { ActionsPurpleSvg } from './ActionsPurple';
import { PhotoShareSvg } from './PhotoShare';
import { LogoMobileSvg } from './LogoMobile';
import { WelcomeAboardSvg } from './WelcomeAboard';
import { NoCompanySvg } from './NoCompany';
import { PinSvg } from './Pin';
import { PinActiveSvg } from './PinActive';
import { NotFoundSvg } from './NotFound';
import { EmployeePhoneSvg } from './EmployeePhone';
import { LinkSvg } from './Link';
import { CopySvg } from './Copy';
import { CustomRoomSvg } from './CustomRoom';
import { AddButtonSvg } from './AddButton';
import { EditSvg } from './Edit';
import { CheckedMarkSvg } from './CheckedMark';
import { ConfirmCheckedSvg } from './ConfirmChecked';
import { ReceptionSvg } from './Reception';
import { OfficeSvg } from './Office';
import { PrivateOfficeSvg } from './PrivateOffice';
import { MeetingRoomSvg } from './MeetingRoom';
import { MaintenanceRoomSvg } from './MaintenanceRoom';
import { LunchRoomSvg } from './LunchRoom';
import { LinkOpenSvg } from './LinkOpen';
import { FlagSvg } from './Flag';
import { PhotoNoteSvg } from './PhotoNote';
import { OfficeBuildingSvg } from './OfficeBuilding';
import { CountryFlagSvg } from './CountryFlag';
import { PhotoBookmarkSvg } from './PhotoBookmark';
import { PhotoFlagSvg } from './PhotoFlag';
import { BasementSvg, CompassSvg, GarageSvg, PlazaSvg, PoolSvg, RoofSvg, ShopSvg, UtilityRoomSvg } from './RoomTypes';
import { MultiUnitSvg } from './MultiUnit';
import { ExteriorSvg } from './Exterior';
import { GalleryPlaceholderSvg } from './GalleryPlaceholder';
import { ShareSvg } from './Share';
import { LandScapeSvg } from './LandScape';
import { CheckboxSvg } from './Checkbox';
import { InfoSvg } from './Info';
import { EquipmentSvg } from './Equipment';
import { MoistureSvg } from './Moisture';
import { DehumidifierSvg } from './Dehumidifier';
import { AirMoverSvg } from './AirMover';
import { DryingMatSvg } from './DryingMat';
import { AirScrubberSvg } from './AirScrubber';
import { InjectDryerSvg } from './InjectDryer';

interface Props {
  type: string;
  id?: string;
  className?: string;
  fill?: string;
  events?: any;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const getIcon = (type, className, id, fill, onClick, onKeyUp) => {
  const icons = {
    forms: <FormSvg onClick={onClick} onKeyUp={onKeyUp} className={className} fill={fill} />,
    logo: <LogoSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    logoicon: <LogoIconSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    logomobile: <LogoMobileSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    sms: <SmsSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    email: <EmailSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    apple: <AppleSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    facebook: <FacebookSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    google: <GoogleSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    close: <CloseSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    closeplainsm: <CloseSvg type="plain-sm" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    closecircle: <CloseCircleSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    sidebarleftarrow: <SideBarLeftArrowSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    sidebarrightarrow: <SideBarRightArrowSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    dropdownarrow: <DropdownArrowSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    funnel: <FunnelSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    dashboard: <DashboardSvg onClick={onClick} onKeyUp={onKeyUp} className={className} fill={fill} />,
    projects: <ProjectsSvg onClick={onClick} onKeyUp={onKeyUp} className={className} fill={fill} />,
    phone: <PhoneSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    plus: <PlusSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    person: <PersonSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    personpurple: <PersonSvg iconType={type} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    people: <PeopleSvg onClick={onClick} onKeyUp={onKeyUp} className={className} fill={fill} />,
    peoplepink: <PeoplePinkSvg />,
    peoplepinksmall: <PeoplePinkSvg iconType={type} />,
    threedots: <ThreeDotsSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    addressbuilding: <AddressBuildingSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    companyarrow: <CompanyArrowSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    hamburgermenu: <HamburgerMenuSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    sidebarclose: <SideBarCloseSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    eye: <EyeSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    eyeclosed: <EyeClosedSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    cube: <CubeSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    cubeplus: <CubePlusSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    cubepluslg: <CubePlusLgSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    hand: <HandSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    bathroom: <BathRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    bedroom: <BedRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    masterbedroom: <BedRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    den: <DenSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    diningroom: <DiningRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    ensuite: <EnsuiteSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    kitchen: <KitchenSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    walkway: <KitchenSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    laundry: <LaundrySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    livingroom: <LivingRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    dropzonebackground: <DropzoneBackgroundSvg />,
    singlehome: <SingleHomeSvg />,
    singlehomesm: <SingleHomeSvg iconType="small" />,
    highrise: <HighriseSvg className={className} />,
    highrisesmall: <HighriseSvg iconType={type} className={className} />,
    modalclose: <ModalCloseSvg />,
    multiunit: <MultiUnitSvg className={className} />,
    filter: <FilterSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    caretup: <CaretUpSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    caretdown: <CaretDownSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    unit: <UnitSvg svgItem={1} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    unitsm: <UnitSvg svgItem={2} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    unitlg: <UnitSvg svgItem={3} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    unitadd: <UnitSvg svgItem={4} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    floor: <FloorSvg svgItem={1} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    floorsm: <FloorSvg svgItem={2} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    flooradd: <FloorSvg svgItem={3} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    rocketemblem: <RocketEmblemSvg svgItem={1} className={className} />,
    rocketemblemtwo: <RocketEmblemSvg svgItem={2} className={className} />,
    rocketemblemthree: <RocketEmblemSvg svgItem={3} className={className} />,
    rocketemblemsmall: <RocketEmblemSvg svgItem={4} className={className} />,
    trash: <TrashSvg svgItem={1} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    trashsm: <TrashSvg svgItem={2} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    trashsmdisabled: <TrashSvg svgItem={3} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    trashsmdark: <TrashSvg svgItem={4} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    trashphoto: <TrashSvg svgItem={5} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    trashmd: <TrashSvg svgItem={6} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    arrowleft: <ArrowLeftSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    hallway: <HallwaySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    stairway: <StairwaySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    elevator: <ElevatorSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    lobby: <LobbySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    storage: <StorageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    bay: <StorageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    mailroom: <StorageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    gym: <GymSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    electricalroom: <ElectricalRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    actionsdefault: <ActionsDefaultSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    actionspurple: <ActionsPurpleSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    photoshareerror: <PhotoShareSvg iconType={type} className={className} />,
    photoshare: <PhotoShareSvg className={className} />,
    welcomeaboard: <WelcomeAboardSvg className={className} />,
    nocompany: <NoCompanySvg className={className} />,
    pin: <PinSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    pinactive: <PinActiveSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    notfound: <NotFoundSvg className={className} />,
    employeephone: <EmployeePhoneSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    link: <LinkSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    copy: <CopySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    edit: <EditSvg svgItem={1} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    editsm: <EditSvg svgItem={2} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    editmd: <EditSvg svgItem={3} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    confirm: <ConfirmCheckedSvg svgItem={1} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    confirmsm: <ConfirmCheckedSvg svgItem={2} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    confirmpurple: <ConfirmCheckedSvg svgItem={3} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    checkmark: <CheckedMarkSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    checkmarkpurplebg: <CheckedMarkSvg type="purple-bg" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    reception: <ReceptionSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    office: <OfficeSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    privateoffice: <PrivateOfficeSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    meetingroom: <MeetingRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    maintenanceroom: <MaintenanceRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    lunchroom: <LunchRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    barbequearea: <LunchRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    flag: <FlagSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    flagpurple: <FlagSvg iconType="purple" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    flagoutlinepurple: <FlagSvg iconType="outlinepurple" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    flagphoto: <FlagSvg iconType="flagPhoto" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    flaggedphoto: <FlagSvg iconType="flaggedPhoto" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    customroom: <CustomRoomSvg className={className} />, // to be removed
    addbutton: <AddButtonSvg svgItem={1} />,
    addbuttonsm: <AddButtonSvg svgItem={2} />,
    usa: <CountryFlagSvg svgItem={1} />,
    canada: <CountryFlagSvg svgItem={2} />,
    uk: <CountryFlagSvg svgItem={3} />,
    nz: <CountryFlagSvg svgItem={4} />,
    aus: <CountryFlagSvg svgItem={5} />,
    pool: <PoolSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    garage: <GarageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    parkinggarage: <GarageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    shed: <GarageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    basement: <BasementSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    machineroom: <BasementSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    shop: <ShopSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    storefront: <ShopSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    utilityroom: <UtilityRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    plaza: <PlazaSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    courtyard: <PlazaSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    roof: <RoofSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    rooftop: <RoofSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // to be removed
    northfacing: <CompassSvg svgItem={1} />, // to be removed
    southfacing: <CompassSvg svgItem={2} />, // to be removed
    eastfacing: <CompassSvg svgItem={3} />, // to be removed
    westfacing: <CompassSvg svgItem={4} />, // to be removed
    carouselcontrollernext: (
      <CarouselControllerSvg iconType="next" onClick={onClick} onKeyUp={onKeyUp} className={className} />
    ),
    carouselcontrollerprev: (
      <CarouselControllerSvg iconType="prev" onClick={onClick} onKeyUp={onKeyUp} className={className} />
    ),
    support: <SupportSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    chevronprevious: <ChevronIconsSvg iconType="previous" className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    chevronnext: <ChevronIconsSvg iconType="next" className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    download: <DownloadSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    downloadpurple: <DownloadSvg iconType="purple" className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    linkopen: <LinkOpenSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    photonote: <PhotoNoteSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    photoflag: <PhotoFlagSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    photobookmark: <PhotoBookmarkSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    bookmark: <BookmarkSvg className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    bookmarkpurple: <BookmarkSvg iconType="purple" className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    bookmarkoutlinepurple: (
      <BookmarkSvg iconType="outlinepurple" className={className} onClick={onClick} onKeyUp={onKeyUp} />
    ),
    bookmarkphoto: <BookmarkSvg iconType="bookmarkPhoto" className={className} onClick={onClick} onKeyUp={onKeyUp} />,
    bookmarkedphoto: (
      <BookmarkSvg iconType="bookmarkedPhoto" className={className} onClick={onClick} onKeyUp={onKeyUp} />
    ),
    officebuilding: <OfficeBuildingSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    exterior: <ExteriorSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    exterioradd: <ExteriorSvg iconType={2} onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    mobileapp: <MobileAppSvg className={className} />,
    crew: <CrewSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    search: <SearchSvg className={className} />,
    circle: <CircleSvg className={className} />,
    circle16: <CircleSvg iconType="16" className={className} />,
    commercial: <CommercialSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    galleryplaceholder: <GalleryPlaceholderSvg className={className} />,
    share: <ShareSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    share32: <ShareSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    landscape: <LandScapeSvg className={className} />,
    checkbox: <CheckboxSvg className={className} onClick={onClick} />,
    square: <SquareSvg className={className} onClick={onClick} />,
    dot: <DotSvg className={className} onClick={onClick} />,
    reportscompact: <ReportsTypeSvg id={id} className={className} onClick={onClick} />,
    reportsexpanded: <ReportsTypeSvg id={id} iconType="expanded" className={className} onClick={onClick} />,
    reportslarge: <ReportsTypeSvg id={id} iconType="large" className={className} onClick={onClick} />,
    radio: <RadioSvg id={id} className={className} onClick={onClick} />,
    info: <InfoSvg id={id} className={className} onClick={onClick} />,
    equipment: <EquipmentSvg id={id} className={className} onClick={onClick} />,
    moisture: <MoistureSvg id={id} className={className} onClick={onClick} />,
    dehumidifier: <DehumidifierSvg id={id} className={className} onClick={onClick} />,
    airmover: <AirMoverSvg id={id} className={className} onClick={onClick} />,
    dryingmat: <DryingMatSvg id={id} className={className} onClick={onClick} />,
    airscrubber: <AirScrubberSvg id={id} className={className} onClick={onClick} />,
    injectdryer: <InjectDryerSvg id={id} className={className} onClick={onClick} />,
  };

  // return null to avoid errors in case if the icon type is not present in the icons list
  return icons[type] || null;
};

const Icon = ({ className, id, fill = '', onClick, onKeyUp, type }: Props) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (type) {
      // Remove all white space from the string, with the regex
      const iconType = type.toLocaleLowerCase().replace(/\s+/g, '');

      // set the icon based on icon type change, useful for conditional icon renderings
      setIcon(getIcon(iconType, className, id, fill, onClick, onKeyUp));
    }
  }, [type, className]);

  return icon;
};

Icon.defaultProps = {
  id: undefined,
  className: undefined,
  fill: undefined,
  events: undefined,
};

const IconMemo = memo(Icon, areEqual);

export { IconMemo as Icon };
