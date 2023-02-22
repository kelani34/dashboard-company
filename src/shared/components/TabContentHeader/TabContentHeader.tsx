import React, { memo, ReactNode } from 'react';
import { Icon } from 'Components/Icons';
import { EditLocation } from 'Containers/RocketScan';
import { areEqual } from 'Utils/equalityChecks';
import { ProjectAlias } from 'Containers/Project';
import { ProjectStatusBadge } from 'Containers/ProjectData';
import classes from './tabContentHeader.module.css';

interface Props {
  icon: any;
  name: any;
  isCommercial: boolean;
  isAccessible: boolean;
  projectId?: string;
  jobNumber?: string;
  actionsCenter?: ReactNode;
  hasDivider?: boolean;
  isLocation?: boolean;
}

const TabContentHeader = ({
  icon,
  name,
  isCommercial,
  isAccessible,
  projectId,
  jobNumber,
  actionsCenter,
  hasDivider,
  isLocation,
}: Props) => (
  <div
    className={`container-fluid d-flex flex-row justify-content-start align-items-center p-0 px-4 ${
      hasDivider ? classes.divider : ''
    }`}
  >
    <div className={`col d-flex flex-row justify-content-start align-items-center ${classes.titleColumn}`}>
      <div className={classes.imageWrapper}>
        <Icon type={icon} className={classes.headerIcon} />
      </div>
      <div>
        <div className={classes.jobTitleContainer}>
          <h1 className={classes.locationName}>{name}</h1>
          {!isLocation && <ProjectStatusBadge />}
        </div>
        {!isLocation && (
          <div className={classes.jobNumberContainer}>
            <div className={classes.label}>Project No.</div>
            <div className={classes.jobNumber}>{jobNumber}</div>
            <div className={classes.label}>Project Alias: </div>
            <ProjectAlias projectId={projectId} />
          </div>
        )}
      </div>

      {isAccessible && (
        <div className={`d-flex justify-content-center align-items-center ${classes.inaccessibleTag}`}>
          Inaccessible
        </div>
      )}

      {isCommercial && <EditLocation />}
    </div>
    {actionsCenter && <div className="col d-flex flex-row justify-content-end align-items-center">{actionsCenter}</div>}
  </div>
);

TabContentHeader.defaultProps = {
  projectId: undefined,
  jobNumber: undefined,
  actionsCenter: null,
  hasDivider: false,
  isLocation: false,
};

const TabContentHeaderMemo = memo(TabContentHeader, areEqual);

export { TabContentHeaderMemo as TabContentHeader };
