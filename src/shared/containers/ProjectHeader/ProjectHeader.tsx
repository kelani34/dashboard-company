import React, { memo, useEffect, useState } from 'react';
import { Icon } from 'Components/Icons';
// import { PillButton } from "Components/PillButton";
// import { Toggle } from "Components/Toggle";
import { areEqual } from 'Utils/equalityChecks';

import { useSelector } from 'react-redux';
import classes from './projectHeader.module.css';

interface Props {
  singleUnitView: boolean;
  isPartOfMultiUnitFlow: boolean;
}

const unitSelector = ({ units }) => {
  let value = '';
  if (units?.unitCreated) {
    value = units?.unit;
  } else if (units?.floorCreated) {
    value = units?.floor;
  }

  return value || false;
};

// temporary user feedback during development
// const temporaryButtonAction = () => alert("Temporarily disabled for development");
const locationNameSelector = ({ projects: { selectedProjectId, myProjects } }) =>
  // random bug where  myProjects.data is undefined.
  ({
    selectedProjectId,
    projects: myProjects.data || [],
  });

const ProjectHeaderContainer = ({ singleUnitView = false, isPartOfMultiUnitFlow = false }: Props) => {
  const { selectedProjectId, projects } = useSelector(locationNameSelector, areEqual);
  const unit: any = useSelector(unitSelector, areEqual);

  const [locationName, setLocationName] = useState('');

  const [iconType] = useState({
    singleUnitProperty: 'singleHome',
    multiUnitProperty: 'highrise',
    unit: 'unit',
  });

  const [icon, setIcon] = useState(undefined);

  // Pull the address out and use it to display the project
  const {
    address: { address: addressName },
  } = projects.find((project: any) => project.id.toString() === selectedProjectId);

  useEffect(() => {
    if (singleUnitView && !isPartOfMultiUnitFlow) {
      setLocationName(addressName);
    } else if (isPartOfMultiUnitFlow && !singleUnitView) {
      setLocationName(addressName);
    } else if (unit) {
      setLocationName(unit?.name);
    }
  }, [singleUnitView, isPartOfMultiUnitFlow, addressName, unit]);

  useEffect(() => {
    if (singleUnitView) {
      if (isPartOfMultiUnitFlow) {
        setIcon(iconType.unit);
      } else {
        setIcon(iconType.singleUnitProperty);
      }
    } else {
      setIcon(iconType.multiUnitProperty);
    }
  }, [singleUnitView, isPartOfMultiUnitFlow]);

  return (
    <div className="container-fluid d-flex flex-row justify-content-start align-items-center p-0">
      <div className="col d-flex flex-row justify-content-start align-items-center">
        <div className={classes.imageWrapper}>
          <Icon type={icon} />
        </div>
        <h1 className={classes.locationName}>{locationName}</h1>
        {singleUnitView && (
          <div className={classes.toggleAlignment}>
            {/* <p className={classes.toggleLabel}>Commercial</p>
            <Toggle checked={false} onChange={temporaryButtonAction} /> */}
          </div>
        )}
      </div>
      {singleUnitView && (
        <div className="col d-flex flex-row justify-content-end align-items-center">
          {/* <Icon type="hand" className={classes.handIcon} /> */}
          {/* <PillButton className={classes.pill} type="button" onClick={temporaryButtonAction}>
            Select
          </PillButton> */}
          {/* <Icon type="actionsdefault" onClick={temporaryButtonAction} /> */}
        </div>
      )}
    </div>
  );
};

const ProjectHeaderContainerMemo = memo(ProjectHeaderContainer, areEqual);

export { ProjectHeaderContainerMemo as ProjectHeader };
