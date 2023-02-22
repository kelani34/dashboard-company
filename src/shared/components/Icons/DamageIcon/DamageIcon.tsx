import React, { memo, useEffect, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import {
  AppliancesSvg,
  CeilingSvg,
  ElectricalSvg,
  ExteriorDamageSvg,
  FlooringSvg,
  PlumbingSvg,
  RoofingSvg,
  StructuralSvg,
  WallsSvg,
  WaterSvg,
  FireSvg,
  ImpactSvg,
  MoldSvg,
  SmokeSvg,
  AsbestosSvg,
  InspectionSvg,
  NaturalSvg,
  CustomSvg,
  AddCustomSvg,
  CarpentrySvg,
  CleaningSvg,
  MiscSvg,
  ProtectionSvg,
} from '../DamageTypes';

interface Props {
  type: string;
  className?: string;
  events?: any;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}

const getIcon = (type, className, onClick, onKeyUp) => {
  const icons = {
    // damaged material icons
    appliances: <AppliancesSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    appliances32: <AppliancesSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    ceiling: <CeilingSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    ceiling32: <CeilingSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    electrical: <ElectricalSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    electrical32: <ElectricalSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    exterior: <ExteriorDamageSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    exterior32: <ExteriorDamageSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    flooring: <FlooringSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    flooring32: <FlooringSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    plumbing: <PlumbingSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    plumbing32: <PlumbingSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    roofing: <RoofingSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    roofing32: <RoofingSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    structural: <StructuralSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    structural32: <StructuralSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    walls: <WallsSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    walls32: <WallsSvg iconType="32" onClick={onClick} onKeyUp={onKeyUp} className={className} />,

    // property damage icons
    water: <WaterSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    fire: <FireSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    impact: <ImpactSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    mold: <MoldSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    smoke: <SmokeSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    asbestos: <AsbestosSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    inspection: <InspectionSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    natural: <NaturalSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    custom: <CustomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    addcustom: <AddCustomSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    carpentry: <CarpentrySvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    cleaning: <CleaningSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    'misc.': <MiscSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    protection: <ProtectionSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
    // mitigation is supposed to use the water svg
    mitigation: <WaterSvg onClick={onClick} onKeyUp={onKeyUp} className={className} />,
  };

  // return null to avoid errors in case if the icon type is not present in the icons list
  return icons[type] || null;
};

const DamageIcon = ({ className, onClick, onKeyUp, type }: Props) => {
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

DamageIcon.defaultProps = {
  className: undefined,
  events: undefined,
};

const DamageIconMemo = memo(DamageIcon, areEqual);

export { DamageIconMemo as DamageIcon };
