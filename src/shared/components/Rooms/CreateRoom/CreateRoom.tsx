import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { PurpleButton } from 'Components/Button';
import { RoomTypeItem } from 'Components/Rooms/CreateRoom/RoomTypeItem';

import classes from './createRoom.module.css';

type RoomType = {
  id: number;
  name: string;
};

interface Props {
  isOpen?: boolean;
  roomTypes: Array<RoomType>;
  isButtonDisable?: boolean;
  fetching?: boolean;
  onButtonClick: (e: any) => void;
  onSelectItem: (e: any) => void;
  modalCloseClick?: (e: any) => void;
}

const CreateRoom = ({
  isOpen = false,
  isButtonDisable,
  fetching,
  roomTypes,
  onButtonClick,
  onSelectItem,
  modalCloseClick,
}: Props) => (
  <Modal
    id="createRoomModal"
    classes={classes}
    title="Select a Room"
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={modalCloseClick}
  >
    <div className="d-flex flex-column w-100">
      <div className="list-group">
        {roomTypes.map((roomType) => (
          <RoomTypeItem key={roomType.id} id={roomType.id} name={roomType.name} onSelectItem={onSelectItem} />
        ))}
      </div>
      <div className={`d-flex mt-4 ${classes.buttonContainer}`}>
        <PurpleButton type="button" onClick={onButtonClick} disabled={isButtonDisable || fetching}>
          Select Room
        </PurpleButton>
      </div>
    </div>
  </Modal>
);

CreateRoom.defaultProps = {
  isOpen: false,
  isButtonDisable: true,
  fetching: false,
  modalCloseClick: undefined,
};

const CreateRoomMemo = memo(CreateRoom, areEqual);

export { CreateRoomMemo as CreateRoom };
