import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { PurpleButton } from 'Components/Button';

import { RoomTypeItem, CreateCustomRoom, EditCustomRoom } from 'Containers/RocketScan';

import classes from './createRoom.module.css';

type RoomType = {
  id: number;
  name: string;
};

interface Props {
  id: number | string;
  location: any;
  isExterior?: boolean;
  isOpen?: boolean;
  roomTypes: Array<RoomType>;
  isButtonDisable?: boolean;
  fetching?: boolean;
  onButtonClick: (e: any) => void;
  onSelectItem: (e: any) => void;
  modalCloseClick?: (e: any) => void;
}

const CreateRoom = ({
  id,
  location,
  isExterior,
  isOpen = false,
  isButtonDisable,
  fetching,
  roomTypes,
  onButtonClick,
  onSelectItem,
  modalCloseClick,
}: Props) => (
  <Modal
    id={id && id.toString()}
    classes={classes}
    title={`Select ${isExterior ? 'Exterior Space' : 'a Room'}`}
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={modalCloseClick}
  >
    <div className="d-flex flex-column w-100">
      <div className="list-group">
        {roomTypes.map(({ id, name, type, is_standard: isStandard, rooms_count: canDelete }: any) =>
          isStandard ? (
            <RoomTypeItem key={id} id={id} name={name} onSelectItem={onSelectItem} />
          ) : (
            <EditCustomRoom
              key={id}
              id={id}
              roomName={name}
              roomType={type}
              canDelete={canDelete === 0}
              onSelectItem={onSelectItem}
            />
          )
        )}
        <CreateCustomRoom location={location} isExterior={isExterior} />
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
  isExterior: false,
  fetching: false,
  modalCloseClick: undefined,
};

const CreateRoomMemo = memo(CreateRoom, areEqual);

export { CreateRoomMemo as CreateRoom };
