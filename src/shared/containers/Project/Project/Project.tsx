import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';

import { ProjectTabs, setSelectedTab } from 'Containers/Project/ProjectTabs';
import { AddLocationTab } from 'Containers/AddLocationTab';

import { ADD_LOCATIONS, ALL_LOCATIONS, MULTI_UNIT, PHOTO_MANAGEMENT, PROJECT_DASHBOARD, SINGLE } from 'Utils/constants';
import { AllLocations } from 'Containers/Project/AllLocations';
import { listProjectPropertiesWithUnits } from 'Containers/Project/actions';
import { projectIdSelector, selectedPropertyTypeSelector } from 'Containers/Project/selectors';

const ProjectContainer = () => {
  const history = useHistory();
  const location = useLocation();
  const { pathname } = location;

  const dispatch = useDispatch();

  const projectId: any = useSelector(projectIdSelector, areEqual);

  const [selectedMainPath, setSelectedMainPath] = useState('');
  const [selectedSubPath, setSelectedSubPath] = useState('');

  const propertyType: any = useSelector(selectedPropertyTypeSelector, areEqual);

  // set tab paths
  useEffect(() => {
    setSelectedMainPath(pathname.includes(PHOTO_MANAGEMENT) ? 'photo-center-tab' : 'project-dash-tab');
    setSelectedSubPath(pathname.includes(ALL_LOCATIONS) ? 'all-locations-tab' : 'add-locations-tab');
  }, [pathname]);

  // fetch properties with units and set single unit data
  useEffect(() => {
    if (projectId && pathname.includes(`/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}`)) {
      dispatch(listProjectPropertiesWithUnits(projectId));
    }
  }, [projectId, pathname]);

  const onMainTabsClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id } = e.currentTarget;
      let redirectPath = '';

      if (id === 'project-dash-tab') {
        redirectPath = `/projects${PROJECT_DASHBOARD}`;
      } else {
        redirectPath = `/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}`;
      }

      history.push(redirectPath);
    },
    [pathname]
  );

  const onSubTabsClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id } = e.currentTarget;
      let redirectPath = '';

      dispatch(setSelectedTab(id));

      if (id === 'all-locations-tab') {
        redirectPath = `/projects${PHOTO_MANAGEMENT}${ALL_LOCATIONS}`;
      } else {
        const basePath = `/projects${PHOTO_MANAGEMENT}${ADD_LOCATIONS}`;

        if (propertyType === 1) {
          redirectPath = `${basePath}${SINGLE}`;
        } else if (propertyType === 2) {
          redirectPath = `${basePath}${MULTI_UNIT}`;
        } else {
          redirectPath = basePath;
        }
      }

      history.push(redirectPath);
    },
    [projectId, pathname, propertyType]
  );

  return (
    <ProjectTabs
      selectedMainTab={selectedMainPath}
      selectedSubPath={selectedSubPath}
      onMainTabsClick={onMainTabsClick}
      onSubTabsClick={onSubTabsClick}
      addLocationsChildren={<AddLocationTab />}
      allLocationsChildren={<AllLocations />}
    />
  );
};

const ProjectContainerMemo = memo(ProjectContainer, areEqual);

export { ProjectContainerMemo as ProjectContainer };
