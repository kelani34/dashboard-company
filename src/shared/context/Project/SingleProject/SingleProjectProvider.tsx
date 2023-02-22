import React, { memo, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import {
  setProjectId,
  setLocationId,
  setPhotoId,
  setSelectedTab,
  getProject,
  listPropertyTypes,
  listRoomLevels,
  listAlbumTypes,
  listRoomTypes,
  listGeneralRoomLevels,
  clearProperty,
  listDamageTypes,
  listRoomNotesCategories,
  listDamagedMaterials,
  listUnitOfMeasurementTypes,
  listScopeActionTypes,
} from 'Containers/RocketScan/actions';
import {
  setCustomLevelCreated,
  setCustomLevelUpdated,
  setCustomLevelDeleted,
} from 'Containers/RocketScan/RoomsView/CreateCustomLevel/actions';
import {
  setCustomDamagedMaterialCreated,
  setCustomDamagedMaterialUpdated,
  setCustomDamagedMaterialDeleted,
} from 'Containers/RocketScan/RoomsView/DamagedMaterials/actions';
import { setProjectInfoCleared } from 'Containers/Projects/actions';
import {
  tabSelector,
  projectIdSelector,
  locationIdSelector,
  photoIdSelector,
  propertySelector,
  propertyTypesSelector,
  industrialRoomLevelsSelector,
  levelTypesSelector,
  exteriorLevelsSelector,
  damageTypesSelector,
  categoriesSelector,
  unitOfMeasurementTypesSelector,
  scopeActionTypesSelector,
} from 'Containers/RocketScan/selectors';
import { customLevelCreatedSelector } from 'Containers/RocketScan/RoomsView/CreateCustomLevel/selectors';
import {
  customLevelUpdatedSelector,
  customLevelDeletedSelector,
} from 'Containers/RocketScan/RoomsView/EditCustomLevel/selectors';

import {
  customDamagedMaterialCreatedSelector,
  customDamagedMaterialUpdatedSelector,
  customDamagedMaterialDeletedSelector,
} from 'Containers/RocketScan/RoomsView/DamagedMaterials/selectors';

import { projectInfoClearedSelector } from 'Containers/Projects/selectors';

import { areEqual } from 'Utils/equalityChecks';
import { locationCreatedSelector, locationTypesSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { getLocation, listLocationTypes } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { setCarouselRoutePath } from 'Containers/RocketScan/PhotoView/Carousel/actions';
import { photosDeletedSelector } from 'Containers/RocketScan/Header/ActionsCenter/selectors';
import { setPhotosDeleted } from 'Containers/RocketScan/Header/ActionsCenter/actions';
import { useProjectEvents } from 'Hooks/useProjectEvents';

const SingleProjectProvider = ({ tab = 'dashboard', children }: any) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    projectId: projectIdParam,
    location: locationIdParam = '',
    photo: photoIdParam = '',
  } = useParams<{ projectId: string; location: string; photo: string }>();

  const selectedTab = useSelector(tabSelector);
  const projectId = useSelector(projectIdSelector);
  const locationId = useSelector(locationIdSelector);
  const photoId = useSelector(photoIdSelector);

  // project selectors
  const property = useSelector(propertySelector, areEqual);
  const propertyTypes = useSelector(propertyTypesSelector, areEqual);
  const projectInfoCleared = useSelector(projectInfoClearedSelector, areEqual);
  // locations selector
  const locationTypes = useSelector(locationTypesSelector, areEqual);
  const locationCreated = useSelector(locationCreatedSelector, areEqual);
  // custom level related selectors
  const customLevelCreated = useSelector(customLevelCreatedSelector, areEqual);
  const customLevelUpdated = useSelector(customLevelUpdatedSelector, areEqual);
  const customLevelDeleted = useSelector(customLevelDeletedSelector, areEqual);
  // custom damaged material related selectors
  const customDamagedMaterialCreated = useSelector(customDamagedMaterialCreatedSelector, areEqual);
  const customDamagedMaterialUpdated = useSelector(customDamagedMaterialUpdatedSelector, areEqual);
  const customDamagedMaterialDeleted = useSelector(customDamagedMaterialDeletedSelector, areEqual);
  // scope of work related selectors
  const unitOfMeasurementTypes = useSelector(unitOfMeasurementTypesSelector, areEqual);
  const scopeActionTypes = useSelector(scopeActionTypesSelector, areEqual);

  // other selectors
  const industrialRoomLevels = useSelector(industrialRoomLevelsSelector, areEqual);
  const exteriorLevels = useSelector(exteriorLevelsSelector, areEqual);
  const levelTypes = useSelector(levelTypesSelector, areEqual);
  const damageTypes = useSelector(damageTypesSelector, areEqual);
  const categories = useSelector(categoriesSelector, areEqual);
  const photoSharePhotosDeleted = useSelector(photosDeletedSelector, areEqual);

  const [propertyId, setPropertyId] = useState(undefined);

  // project events hook
  const [refreshProjects, setRefreshProjects, projectDeleted] = useProjectEvents(projectIdParam);

  // set selected tab, route name
  useEffect(() => {
    if (tab && tab !== selectedTab) {
      dispatch(setSelectedTab(tab));
    }
  }, [tab, selectedTab]);

  // set project id
  // fetch project details
  // fetch property types
  // fetch damage types
  useEffect(() => {
    if (projectIdParam && (projectIdParam !== projectId || projectInfoCleared)) {
      dispatch(setProjectInfoCleared(false));
      // album types
      dispatch(listAlbumTypes(projectIdParam));
      // clear property
      dispatch(clearProperty());
      // get project details
      dispatch(getProject(projectIdParam, !!locationIdParam));
      // list property types
      if (propertyTypes.length === 0) {
        dispatch(listPropertyTypes());
      }
      // list damage types
      if (damageTypes.length === 0) {
        dispatch(listDamageTypes());
      }
      // list damage materials per project
      dispatch(listDamagedMaterials(projectIdParam));
      if (categories.length === 0) {
        dispatch(listRoomNotesCategories());
      }
      dispatch(setProjectId(projectIdParam));
      // photo view back to room link
      dispatch(setCarouselRoutePath(`/projects/${projectIdParam}/rocketscan`));
    }
  }, [projectIdParam, locationIdParam, projectInfoCleared]);

  // set location id
  useEffect(() => {
    if (locationIdParam && locationIdParam !== locationId) {
      dispatch(setLocationId(locationIdParam));
      dispatch(getLocation(locationIdParam));
    }
  }, [locationIdParam]);

  // set photo id
  useEffect(() => {
    if (photoIdParam && photoIdParam !== photoId) {
      dispatch(setPhotoId(photoIdParam));
    }
  }, [photoIdParam, photoId]);

  // fetch location types only if properties empty
  useEffect(() => {
    if (locationTypes.length === 0 && !property?.id) {
      dispatch(listLocationTypes());
    }
  }, [property]);

  // fetch units of measurement for scope of work
  useEffect(() => {
    if (unitOfMeasurementTypes.length === 0) {
      dispatch(listUnitOfMeasurementTypes());
    }
  }, []);

  // fetch scope actions for scope of work
  useEffect(() => {
    if (scopeActionTypes.length === 0) {
      dispatch(listScopeActionTypes());
    }
  }, []);

  // fetch project details when the first location created
  useEffect(() => {
    if (locationCreated && property?.id) {
      const { name } = property;
      if (name === 'singleunit') {
        dispatch(getProject(projectIdParam));
      }
    }
  }, [locationCreated, property]);

  // fetch project details when photos deleted
  useEffect(() => {
    if (photoSharePhotosDeleted) {
      dispatch(getProject(projectIdParam));
      dispatch(setPhotosDeleted(false));
    }
  }, [photoSharePhotosDeleted, property]);

  // fetch room levels when changing property
  useEffect(() => {
    if (property?.id && property.id !== propertyId) {
      setPropertyId(property.id);
    }
  }, [property, propertyId]);
  useEffect(() => {
    if (property?.id) {
      if (property.name === 'commercial') {
        if (industrialRoomLevels.length === 0) {
          dispatch(listRoomLevels(property?.id, 'external'));
        }
      } else {
        if (levelTypes.length === 0) {
          dispatch(listRoomLevels(property?.id));
        }
        if (exteriorLevels.length === 0) {
          dispatch(listRoomLevels(property?.id, 'external'));
        }
      }
    }
  }, [property]);

  // fetch levels when creating or editing a custom room
  useEffect(() => {
    if (customLevelCreated || customLevelUpdated || customLevelDeleted) {
      dispatch(listRoomLevels(property.id));
      dispatch(listRoomLevels(property?.id, 'external'));
      dispatch(listGeneralRoomLevels(projectId));

      dispatch(setCustomLevelCreated(false));
      dispatch(setCustomLevelUpdated(false));
      dispatch(setCustomLevelDeleted(false));
    }
  }, [property, projectId, customLevelCreated, customLevelUpdated, customLevelDeleted]);

  // fetch damaged materials
  useEffect(() => {
    if (projectId && (customDamagedMaterialCreated || customDamagedMaterialUpdated || customDamagedMaterialDeleted)) {
      dispatch(listDamagedMaterials(projectId));

      dispatch(setCustomDamagedMaterialCreated(false));
      dispatch(setCustomDamagedMaterialUpdated(false));
      dispatch(setCustomDamagedMaterialDeleted(false));
    }
  }, [projectId, customDamagedMaterialCreated, customDamagedMaterialUpdated, customDamagedMaterialDeleted]);

  // fetch room types
  useEffect(() => {
    if (property?.id && projectId) {
      // room types
      if (property.name === 'singleunit' || property.name === 'multiunit') {
        dispatch(listRoomTypes(property.id, 'unit'));
        dispatch(listRoomTypes(property.id, 'floor'));
        dispatch(listRoomTypes(property.id, 'single-external'));
        dispatch(listRoomTypes(property.id, 'multi-external'));
      }
      if (property.name === 'commercial') {
        dispatch(listRoomTypes(property.id, 'industrial'));
      }
      if (property.name === 'exterior') {
        dispatch(listRoomTypes(property.id, 'external'));
      }
      dispatch(listRoomTypes(property.id, 'single-location'));

      dispatch(listGeneralRoomLevels(projectId));
    }
  }, [property, projectId]);

  // refresh project details on push events
  // on delete redirect back to the projects
  useEffect(() => {
    if (refreshProjects || projectDeleted) {
      if (projectDeleted) {
        history.push('/projects');
      } else {
        dispatch(getProject(projectIdParam));
      }
      setRefreshProjects(false);
    }
  }, [refreshProjects, projectDeleted, projectIdParam]);

  return <>{children}</>;
};

const SingleProjectProviderMemo = memo(SingleProjectProvider, areEqual);

export { SingleProjectProviderMemo as SingleProjectProvider };
