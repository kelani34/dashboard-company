import React, { memo, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';
import { Icon } from 'Components/Icons';
import { TileButton } from 'Components/Button';
import { projectIdSelector, propertySelector, propertyTypesSelector } from 'Containers/RocketScan/selectors';
import {
  exteriorLocationSelector,
  locationTypesSelector,
  multiUnitExteriorLocationCreatedSelector,
} from 'Containers/RocketScan/MultiUnit/Locations/selectors';
import { useHistory } from 'react-router-dom';
import {
  createExteriorLocationWithoutRoom,
  getExteriorLocation,
  setMultiUnitExteriorLocationCreated,
  createLocationForTempProperty,
} from 'Containers/RocketScan/MultiUnit/Locations/actions';

import { selectPhotosModeSelector } from 'Containers/RocketScan/Header/ActionsCenter/selectors';

const CreateExteriorContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const projectId = useSelector(projectIdSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);
  const exteriorLocation = useSelector(exteriorLocationSelector, areEqual);
  const propertyTypes = useSelector(propertyTypesSelector, areEqual);
  const locationTypes = useSelector(locationTypesSelector, areEqual);
  const multiUnitExteriorLocationCreated = useSelector(multiUnitExteriorLocationCreatedSelector, areEqual);
  const isSelectingPhotoMode = useSelector(selectPhotosModeSelector, areEqual);

  useEffect(() => {
    if (property?.id && locationTypes.length > 0) {
      const locationTypeId = locationTypes.find((type: any) => type.name === 'exterior')?.id;

      dispatch(getExteriorLocation(property?.id, locationTypeId));
    }
  }, [property, locationTypes]);

  const onClickTileButton = useCallback(() => {
    if (projectId && property?.id && exteriorLocation?.id) {
      history.push(`/projects/${projectId}/rocketscan/multiunit/${exteriorLocation?.id}`);
    } else {
      const propertyTypeId = propertyTypes.find((type: any) => type.name === 'multiunit')?.id;
      const locationTypeId = locationTypes.find((type: any) => type.name === 'exterior')?.id;

      if (property?.name === 'temp' && property?.id) {
        dispatch(
          createLocationForTempProperty(
            propertyTypeId,
            {
              location_type_id: locationTypeId,
              name: 'Exterior',
              floor_number: 0,
            },
            property.id,
            {
              isMultiUnitExterior: true,
              propertyName: 'multiunit',
            }
          )
        );
      } else {
        dispatch(
          createExteriorLocationWithoutRoom(projectId, property, propertyTypeId, {
            location_type_id: locationTypeId,
            name: 'Exterior',
            floor_number: 0,
          })
        );
      }
    }
  }, [projectId, property, exteriorLocation, propertyTypes, locationTypes]);

  useEffect(() => {
    if (multiUnitExteriorLocationCreated) {
      history.push(`/projects/${projectId}/rocketscan/multiunit/${multiUnitExteriorLocationCreated}`);
    }

    return () => {
      if (multiUnitExteriorLocationCreated) {
        dispatch(setMultiUnitExteriorLocationCreated(undefined));
      }
    };
  }, [multiUnitExteriorLocationCreated]);

  return (
    <TileButton
      caption="Exterior +"
      onTileClick={onClickTileButton}
      icon={<Icon type="exterioradd" />}
      sizeSmall
      disabled={isSelectingPhotoMode}
    />
  );
};

const CreateExteriorContainerMemo = memo(CreateExteriorContainer, areEqual);

export { CreateExteriorContainerMemo as CreateExteriorContainer };
