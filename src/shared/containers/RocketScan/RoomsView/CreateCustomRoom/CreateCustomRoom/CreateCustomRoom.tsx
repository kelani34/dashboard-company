import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { AddCustomForm } from 'Components/RocketScan';
import { useDispatch, useSelector } from 'react-redux';
import {
  createCustomRoom,
  setCustomRoomCreated,
  setCustomRoomDeleted,
  setCustomRoomUpdated,
} from 'Containers/RocketScan/RoomsView/CreateCustomRoom/actions';
import { propertySelector } from 'Containers/RocketScan/selectors';
import {
  customRoomCreatedSelector,
  customRoomDeletedSelector,
  customRoomUpdatedSelector,
  nameErrorSelector,
} from 'Containers/RocketScan/RoomsView/CreateCustomRoom/selectors';
import { coreFetchingSelector } from 'Containers/Core/selectors';

import formClasses from 'Themes/form/form.module.css';
import classes from './createCustomRoom.module.css';

interface Props {
  roomName?: string;
  location: any;
  isExterior?: boolean;
}

const CreateCustomRoomContainer = ({ roomName, location, isExterior }: Props) => {
  const dispatch = useDispatch();

  // selectors
  const property = useSelector(propertySelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);
  // room types crud selectors
  const customRoomCreated = useSelector(customRoomCreatedSelector, areEqual);
  const customRoomUpdated = useSelector(customRoomUpdatedSelector, areEqual);
  const customRoomDeleted = useSelector(customRoomDeletedSelector, areEqual);

  // local variables
  const [name, setName] = useState('');
  const [iconName, setIconName] = useState('addbutton');
  const [isButtonEnable, setIsButtonEnable] = useState(true);

  // api errors
  const errors = {
    name: useSelector(nameErrorSelector, areEqual),
  };

  // set room type name
  useEffect(() => {
    if (roomName) {
      setName(roomName);
    }
  }, [roomName]);

  const onNameChange = useCallback(({ target: { value } }: any) => {
    setName(value);
    setIsButtonEnable(value.length === 0);
    setIconName(value.length > 0 ? 'addbutton' : 'addbutton'); // TODO::need to create purple color button
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      let locationType = '';

      const {
        location_type: { name: locationTypeName },
        is_commercial: isCommercial,
      } = location;
      const { name: propertyType } = property;

      if (propertyType === 'singleunit' || propertyType === 'multiunit') {
        if (isExterior && propertyType === 'singleunit') {
          locationType = 'single-external';
        } else if (isExterior && propertyType === 'multiunit') {
          locationType = 'multi-external';
        } else if (isCommercial) {
          locationType = 'commercial';
        } else {
          locationType = locationTypeName.toLocaleLowerCase();
        }
      } else if (propertyType === 'commercial') {
        locationType = 'industrial';
      } else if (propertyType === 'exterior') {
        locationType = 'external';
      }

      if (!locationType) {
        alert('Something went wrong, Please try again!');
      } else {
        // api call
        dispatch(
          createCustomRoom(property?.id, {
            name,
            type: locationType,
          })
        );
      }
    },
    [property, location, name, isExterior]
  );

  // refresh room types
  useEffect(() => {
    if (customRoomCreated) {
      setName('');
    }

    return () => {
      if (customRoomCreated || customRoomUpdated || customRoomDeleted) {
        dispatch(setCustomRoomCreated(false));
        dispatch(setCustomRoomUpdated(false));
        dispatch(setCustomRoomDeleted(false));
      }
    };
  }, [customRoomCreated, customRoomUpdated, customRoomDeleted]);

  return (
    <div className={`${classes.customFormWrapper} ${errors.name.length > 0 ? classes.errorBackground : ''}`}>
      <AddCustomForm
        iconRoom
        name={name}
        placeholderText="Add Custom Room"
        deleteIcon="trash"
        saveIcon={iconName}
        formErrors={errors}
        isButtonEnable={isButtonEnable}
        fetching={fetching}
        onNameChange={onNameChange}
        onSubmit={onFormSubmit}
      />
      <div
        className={`${formClasses.invalidFieldFeedback} invalid-feedback ${errors.name.length ? 'd-block' : ''} ${
          classes.errorMessages
        }`}
      >
        {errors?.name?.[0]}
      </div>
    </div>
  );
};
CreateCustomRoomContainer.defaultProps = {
  roomName: undefined,
  isExterior: false,
};

const CreateCustomRoomContainerMemo = memo(CreateCustomRoomContainer, areEqual);

export { CreateCustomRoomContainerMemo as CreateCustomRoom };
