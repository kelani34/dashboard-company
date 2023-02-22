import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { AddCustomForm } from 'Components/RocketScan';
import { RoomTypeItem } from 'Containers/RocketScan';
import { Icon } from 'Components/Icons';

import { useDispatch, useSelector } from 'react-redux';
import { propertySelector } from 'Containers/RocketScan/selectors';
import { coreFetchingSelector } from 'Containers/Core/selectors';
import { deleteCustomRoom, updateCustomRoom } from 'Containers/RocketScan/RoomsView/CreateCustomRoom/actions';
import classes from './editCustomRoom.module.css';

interface Props {
  id: number;
  roomName: string;
  roomType: string;
  canDelete: boolean;
  onSelectItem: (e: any) => void;
}

const EditCustomRoomContainer = ({ id, roomName, roomType, canDelete, onSelectItem }: Props) => {
  const dispatch = useDispatch();

  // selectors
  const property = useSelector(propertySelector, areEqual);
  const fetching = useSelector(coreFetchingSelector, areEqual);

  // local variables
  const [name, setName] = useState('');
  const [isEditable, setIsEditable] = useState(false);
  const [isButtonEnable, setIsButtonEnable] = useState(false);

  useEffect(() => {
    setName(roomName);
  }, [roomName]);

  const onClickEditIcon = useCallback(() => {
    setIsEditable(true);
  }, []);

  const onNameChange = useCallback(({ target: { value } }) => {
    setName(value);
    setIsButtonEnable(value.length === 0);
  }, []);

  // disable edit mode after edit an item
  const disableEditMode = useCallback(() => {
    setIsEditable(false);
  }, []);

  // delete custom room
  const onDeleteButtonClick = useCallback(() => {
    dispatch(deleteCustomRoom(property?.id, id, roomType));
  }, [property, roomType]);

  // form submit to update custom room
  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      // api call
      dispatch(updateCustomRoom(property?.id, id, { name }, disableEditMode));
    },
    [id, name, property]
  );

  return isEditable ? (
    <div className={classes.addCustomFormWrapper}>
      <AddCustomForm
        iconRoom
        name={name}
        placeholderText="Edit Custom Room"
        saveIcon="confirm"
        deleteIcon="trash"
        isEditable={isEditable}
        canDelete={canDelete}
        onNameChange={onNameChange}
        isButtonEnable={isButtonEnable}
        onDeleteButtonClick={onDeleteButtonClick}
        onSubmit={onFormSubmit}
        fetching={fetching}
      />
    </div>
  ) : (
    <div className={classes.editRoomTypeContent}>
      <RoomTypeItem key={id} id={id} name={roomName} isStandard={false} onSelectItem={onSelectItem} />
      <Icon type="edit" onClick={onClickEditIcon} className={classes.editIcon} />
    </div>
  );
};

const EditCustomRoomContainerMemo = memo(EditCustomRoomContainer, areEqual);

export { EditCustomRoomContainerMemo as EditCustomRoomContainer };
