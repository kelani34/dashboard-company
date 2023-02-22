import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { RoomLevel } from 'Components/RocketScan';
import { RoomButton } from 'Containers/RocketScan';

interface Props {
  hideLevel?: any;
  levelRooms: any;
  selectedRoomId?: number;
  locationId: number;
  onClickRoomButton: (e: any) => void;
}

const RoomButtons = ({ hideLevel, levelRooms, selectedRoomId, locationId, onClickRoomButton }: Props) => (
  <>
    {levelRooms.map(
      ({ levelName, rooms }) =>
        rooms.length > 0 && (
          <RoomLevel key={`level-${levelName}`} name={levelName} hideLevel={hideLevel}>
            {rooms.map(({ id, name, isStandard, typeOccurrence }: any, index: number) => (
              <span key={`room-button-${id}`} className="w-100">
                <RoomButton
                  id={id}
                  locationId={locationId}
                  iconType={isStandard ? name : 'customroom'}
                  isActive={selectedRoomId === id}
                  onClick={onClickRoomButton}
                  isLastItem={index === rooms.length - 1}
                >
                  {`${name} ${typeOccurrence !== 1 ? typeOccurrence : ''}`}
                </RoomButton>
              </span>
            ))}
          </RoomLevel>
        )
    )}
  </>
);

RoomButtons.defaultProps = {
  hideLevel: undefined,
  selectedRoomId: undefined,
};

const RoomButtonsMemo = memo(RoomButtons, areEqual);

export { RoomButtonsMemo as RoomButtons };
