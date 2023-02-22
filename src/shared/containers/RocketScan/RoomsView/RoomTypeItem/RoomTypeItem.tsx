import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { RoomTypeItem } from 'Components/RocketScan';

interface Props {
  id: number;
  name: string;
  isStandard?: boolean;
  onSelectItem: (e: any) => void;
}

const RoomTypeItemContainer = ({ id, name, isStandard, onSelectItem }: Props) => {
  const onClickRoomType = useCallback((e: any) => {
    e.preventDefault();

    if (onSelectItem) onSelectItem(id);
  }, []);

  return <RoomTypeItem key={id} id={id} name={name} isStandard={isStandard} onSelectItem={onClickRoomType} />;
};

RoomTypeItemContainer.defaultProps = {
  isStandard: true,
};

const RoomTypeItemContainerMemo = memo(RoomTypeItemContainer, areEqual);

export { RoomTypeItemContainerMemo as RoomTypeItemContainer };
