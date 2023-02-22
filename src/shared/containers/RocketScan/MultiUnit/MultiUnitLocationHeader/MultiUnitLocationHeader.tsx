import React, { memo, useCallback, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { EditButton } from 'Components/Button/EditButton';

import { Icon } from 'Components/Icons';

import { useLocationsViewFunctions } from 'Context/Project/LocationsView';

import classes from './multiUnitLocationHeader.module.css';

interface Props {
  location: any;
  onClickLocationName: (e: any) => void;
}

const MultiUnitLocationHeader = ({ location, onClickLocationName }: Props) => {
  const [editable, setEditable] = useState(false);

  const { setLocationInfo, setIsOpenDeleteLocationModal }: any = useLocationsViewFunctions();
  const { id: locationId, name, floor_number: floor, photos_count: photosCount, rooms_count: roomsCount } = location;

  const onEditButtonClick = useCallback(() => {
    setEditable(!editable);
  }, [editable]);

  const onDeleteIconClick = useCallback(
    (e: any) => {
      e.preventDefault();
      if (locationId) {
        setLocationInfo(locationId, name, floor, photosCount, roomsCount);
        setIsOpenDeleteLocationModal(true);
      }
    },
    [locationId]
  );

  return (
    <h6 className={classes.locationHeader}>
      <span className={classes.editBar}>
        {editable ? (
          <span>{name}</span>
        ) : (
          <span role="button" tabIndex={0} onClick={onClickLocationName} onKeyUp={onClickLocationName}>
            {name}
          </span>
        )}
        {editable && <Icon className={classes.deleteIcon} type="trashsm" onClick={onDeleteIconClick} />}
      </span>
      <EditButton editable={editable} onClick={onEditButtonClick} />
    </h6>
  );
};

const MultiUnitLocationHeaderMemo = memo(MultiUnitLocationHeader, areEqual);

export { MultiUnitLocationHeaderMemo as MultiUnitLocationHeader };
