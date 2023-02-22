import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { ChoosePropertyType } from 'Components/RocketScan';
import { Spinner } from 'Components/Spinner';

import { useDispatch, useSelector } from 'react-redux';
import {
  fetchingProjectSelector,
  projectAddressSelector,
  projectSelector,
  propertySelector,
  propertyTypesSelector,
  singleLocationRoomTypeSelector,
} from 'Containers/RocketScan/selectors';
import { useHistory } from 'react-router-dom';

import { locationTypesSelector, locationSelector } from 'Containers/RocketScan/MultiUnit/Locations/selectors';

import {
  createLocation,
  createSingleLocation,
  createExteriorLocation,
  createLocationForTempProperty,
} from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { setFetchingProject } from 'Containers/RocketScan/actions';
import { Exterior, Header, MultiUnit, SingleLocation, SingleUnit, RocketScanWrapper } from 'Containers/RocketScan';

const multiUnitProperties = ['multiunit', 'commercial'];

const getPropertyType = (name: string) => {
  if (multiUnitProperties.includes(name)) {
    return 'multiunit';
  }
  return 'singleunit';
};

const RocketScanContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const [headerIcon, setHeaderIcon] = useState('singlehome');
  const [propertyType, setPropertyType] = useState('');
  const [isAccessible, setIsAccessible] = useState(true);
  const [isTempPropertyType, setIsTempPropertyType] = useState(false);

  // selectors
  const project = useSelector(projectSelector, areEqual);
  const projectAddress = useSelector(projectAddressSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const propertyTypes = useSelector(propertyTypesSelector, areEqual);
  const locationTypes = useSelector(locationTypesSelector, areEqual);
  const fetching = useSelector(fetchingProjectSelector, areEqual);
  const singleLocationRoomType = useSelector(singleLocationRoomTypeSelector, areEqual);
  const location = useSelector(locationSelector, areEqual);

  // set options according to property type
  useEffect(() => {
    if (property?.id) {
      const { name } = property;

      setPropertyType(getPropertyType(name));
      setIsTempPropertyType(false);

      if (name === 'singleunit') {
        setHeaderIcon('singlehome');
      } else if (name === 'multiunit') {
        setHeaderIcon('highrise');
      } else if (name === 'singlelocation') {
        setHeaderIcon('unitlg');
      } else if (name === 'exterior') {
        setHeaderIcon('exterior');
      } else if (name === 'temp') {
        setIsTempPropertyType(true);
      }
    }
  }, [property]);

  // Do not show inaccessible tag if project is new and without properties
  useEffect(() => {
    if (property === undefined || propertyType === 'multiunit') {
      setIsAccessible(false);
    } else if (location?.id) {
      const { is_accessible: locationIsAccessible } = location;

      setIsAccessible(!locationIsAccessible);
    }
  }, [property, location, propertyType]);

  // creating a single unit
  const onSingleUnitTileClick = useCallback(() => {
    if (locationTypes.length > 0 && propertyTypes.length > 0) {
      // enable main spinner. this will automatically disabled on project details endpoint
      dispatch(setFetchingProject(true));

      // variables
      const propertyTypeId = propertyTypes.find((type: any) => type.name === 'singleunit')?.id;
      const locationTypeId = locationTypes.find((type: any) => type.name === 'unit')?.id;
      const projectId = project?.id;

      // api call
      if (isTempPropertyType) {
        dispatch(
          createLocationForTempProperty(
            propertyTypeId,
            {
              location_type_id: locationTypeId,
              name: projectAddress,
              floor_number: 0, // using 0 as default for single units
            },
            property.id
          )
        );
      } else {
        dispatch(
          createLocation(projectId, propertyTypeId, {
            location_type_id: locationTypeId,
            name: projectAddress,
            floor_number: 0, // using 0 as default for single units
          })
        );
      }
    } else {
      alert('Something went wrong. Please try again later!');
    }
  }, [project, property, isTempPropertyType, locationTypes, propertyTypes, projectAddress]);

  // creating a single location
  const onSingleLocationTileClick = useCallback(() => {
    if (locationTypes.length > 0 && propertyTypes.length > 0) {
      // enable main spinner. this will automatically disabled on project details endpoint
      dispatch(setFetchingProject(true));

      // variables
      const propertyTypeId = propertyTypes.find((type: any) => type.name === 'singlelocation')?.id;
      const locationTypeId = locationTypes.find((type: any) => type.name === 'unit')?.id;
      const projectId = project?.id;
      const roomTypeId = singleLocationRoomType?.id;

      // api call
      if (isTempPropertyType) {
        dispatch(
          createLocationForTempProperty(
            propertyTypeId,
            {
              location_type_id: locationTypeId,
              name: projectAddress,
              floor_number: 0, // using 0 as default for single units
            },
            property.id,
            { propertyName: 'single location', roomTypeId }
          )
        );
      } else {
        dispatch(
          createSingleLocation(
            projectId,
            propertyTypeId,
            {
              location_type_id: locationTypeId,
              name: projectAddress,
              floor_number: 0, // using 0 as default for single units
            },
            roomTypeId
          )
        );
      }
    } else {
      alert('Something went wrong. Please try again later!');
    }
  }, [project, property, isTempPropertyType, locationTypes, propertyTypes, projectAddress, singleLocationRoomType]);

  // creating a exterior location
  const onExteriorTileClick = useCallback(() => {
    if (locationTypes.length > 0 && propertyTypes.length > 0) {
      // enable main spinner. this will automatically disabled on project details endpoint
      dispatch(setFetchingProject(true));

      // variables
      const propertyTypeId = propertyTypes.find((type: any) => type.name === 'exterior')?.id;
      const locationTypeId = locationTypes.find((type: any) => type.name === 'unit')?.id;
      const projectId = project?.id;

      // api call
      if (isTempPropertyType) {
        dispatch(
          createLocationForTempProperty(
            propertyTypeId,
            {
              location_type_id: locationTypeId,
              name: projectAddress,
              floor_number: 0, // using 0 as default for single units
            },
            property.id,
            { propertyName: 'exterior' }
          )
        );
      } else {
        dispatch(
          createExteriorLocation(projectId, propertyTypeId, {
            location_type_id: locationTypeId,
            name: projectAddress,
            floor_number: 0, // using 0 as default for single units
          })
        );
      }
    } else {
      alert('Something went wrong. Please try again later!');
    }
  }, [project, property, isTempPropertyType, locationTypes, propertyTypes, projectAddress]);

  const onMultiUnitTileClick = useCallback(() => {
    // make a route change to multi unit view
    const projectId = project?.id;

    history.push(`/projects/${projectId}/rocketscan/multiunit`);
  }, [project]);

  const onCommercialTileClick = useCallback(() => {
    // make a route change to commercial view
    const projectId = project?.id;

    history.push(`/projects/${projectId}/rocketscan/commercial`);
  }, [project]);

  return (
    <RocketScanWrapper>
      <Spinner loading={fetching} />
      {!fetching && (
        <Header
          icon={headerIcon}
          name={projectAddress}
          isCommercial={property?.name === 'singleunit'}
          isAccessible={isAccessible}
          propertyType={propertyType}
          locationType={propertyType === 'multiunit' ? 'locationsview' : 'roomsview'}
          projectId={project?.id}
          jobNumber={project?.uid}
        />
      )}
      {!fetching && (!property?.id || isTempPropertyType) && (
        <ChoosePropertyType
          onSingleUnitTileClick={onSingleUnitTileClick}
          onSingleLocationTileClick={onSingleLocationTileClick}
          onMultiUnitTileClick={onMultiUnitTileClick}
          onExteriorTileClick={onExteriorTileClick}
          onCommercialTileClick={onCommercialTileClick}
        />
      )}

      {!fetching && property?.name === 'singleunit' && <SingleUnit />}
      {!fetching && property?.name === 'multiunit' && <MultiUnit withoutWrapper />}
      {!fetching && property?.name === 'singlelocation' && <SingleLocation />}
      {!fetching && property?.name === 'exterior' && <Exterior />}
      {!fetching && property?.name === 'commercial' && <MultiUnit isCommercialProperty withoutWrapper />}
    </RocketScanWrapper>
  );
};

const RocketScanContainerMemo = memo(RocketScanContainer, areEqual);

export { RocketScanContainerMemo as RocketScan };
