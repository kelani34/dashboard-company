import React, { memo, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { BathRoomSvg } from '../BathRoom';
import { BedRoomSvg } from '../BedRoom';
import { CustomRoomSvg } from '../CustomRoom';
import { DenSvg } from '../Den';
import { DiningRoomSvg } from '../DiningRoom';
import { ElectricalRoomSvg } from '../ElectricalRoom';
import { ElevatorSvg } from '../Elevator';
import { EnsuiteSvg } from '../Ensuite';
import { GymSvg } from '../Gym';
import { HallwaySvg } from '../Hallway';
import { KitchenSvg } from '../Kitchen';
import { LaundrySvg } from '../Laundry';
import { LivingRoomSvg } from '../LivingRoom';
import { LobbySvg } from '../Lobby';
import { LunchRoomSvg } from '../LunchRoom';
import { MaintenanceRoomSvg } from '../MaintenanceRoom';
import { MeetingRoomSvg } from '../MeetingRoom';
import { OfficeSvg } from '../Office';
import { PrivateOfficeSvg } from '../PrivateOffice';
import { ReceptionSvg } from '../Reception';
import { StairwaySvg } from '../Stairway';
import { StorageSvg } from '../Storage';
import {
  BasementSvg,
  CompassSvg,
  DeckSvg,
  GarageSvg,
  PatioSvg,
  PlazaSvg,
  PoolSvg,
  RoofSvg,
  ShopSvg,
  UtilityRoomSvg,
} from '../RoomTypes';

interface Props {
  type: string;
  className?: string;
  events?: any;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const getIcon = (type, className, onClick, onKeyUp) => {
  const icons = {
    balcony: <PatioSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // potential image change
    barbequearea: <LunchRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    basement: <BasementSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    bathroom: <BathRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    bay: <StorageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    bedroom: <BedRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    courtyard: <PlazaSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    customroom: <CustomRoomSvg className={className} />,
    deck: <DeckSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // potential image change
    den: <DenSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // potential image change
    diningroom: <DiningRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    eastfacing: <CompassSvg svgItem={3} />,
    electricalroom: <ElectricalRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    elevator: <ElevatorSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    ensuite: <EnsuiteSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />, // potential image change
    entryway: <PlazaSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    garage: <GarageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    gym: <GymSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    hallway: <HallwaySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    kitchen: <KitchenSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    laundry: <LaundrySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    leisureroom: <DenSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    livingroom: <LivingRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    lobby: <LobbySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    lunchroom: <LunchRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    machineroom: <BasementSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    mailroom: <StorageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    maintenanceroom: <MaintenanceRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    masterbedroom: <BedRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    meetingroom: <MeetingRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    multipurposeroom: <ReceptionSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    northfacing: <CompassSvg svgItem={1} />,
    office: <OfficeSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    parkinggarage: <GarageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    patio: <PatioSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    plaza: <PlazaSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    pool: <PoolSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    privateoffice: <PrivateOfficeSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    reception: <ReceptionSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    roof: <RoofSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    rooftop: <RoofSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    shed: <GarageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    shop: <ShopSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    southfacing: <CompassSvg svgItem={2} />,
    stairway: <StairwaySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    storage: <StorageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    storefront: <ShopSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    terrace: <DeckSvg className={className} />,
    utilityroom: <UtilityRoomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    walkway: <KitchenSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    westfacing: <CompassSvg svgItem={4} />,
  };

  // return null to avoid errors in case if the icon type is not present in the icons list
  return icons[type] || <CustomRoomSvg className={className} />;
};

const RoomIcon = ({ className, onClick, onKeyUp, type }: Props) => {
  const [icon, setIcon] = useState(null);

  useEffect(() => {
    if (type) {
      // Remove all white space from the string, with the regex
      const iconType = type.toLocaleLowerCase().replace(/\s+/g, '');

      // set the icon based on icon type change, useful for conditional icon renderings
      setIcon(getIcon(iconType, className, onClick, onKeyUp));
    }
  }, [type]);

  return icon;
};

RoomIcon.defaultProps = {
  className: undefined,
  events: undefined,
};

const RoomIconMemo = memo(RoomIcon, areEqual);

export { RoomIconMemo as RoomIcon };
