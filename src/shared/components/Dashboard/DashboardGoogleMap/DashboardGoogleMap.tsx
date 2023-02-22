import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { GoogleMap } from 'Components/GoogleMap';

import { CompanyProjectsDataModal } from 'Containers/Projects/Modals';
import classes from './dashboardGoogleMap.module.css';

interface Props {
  myProjects: CompanyProjectsDataModal;
  fetching: any;
  activeProject: any;
  handleChangeProject: any;
  center: any;
  zoom: any;
}

const DashboardGoogleMap = ({ myProjects, fetching, activeProject, handleChangeProject, center, zoom }: Props) => (
  <div className={`card ${classes.cardBase}`}>
    <GoogleMap
      center={center}
      zoom={zoom}
      activeProject={activeProject}
      handleChangeProject={handleChangeProject}
      myProjects={myProjects}
      fetching={fetching}
    />
  </div>
);

const DashboardGoogleMapMemo = memo(DashboardGoogleMap, areEqual);

export { DashboardGoogleMapMemo as DashboardGoogleMap };
