import React, { memo, useCallback, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Item } from 'Components/Selectors/UnitsMenu/Item';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';

import { setSelectedRoomId } from 'Containers/Project/Unit/Rooms/actions';
import { listAllRooms } from '../SideBarMenu/actions';

interface Props {
  item: any;
  accordionId: string;
  itemMenuHeading: string;
  itemSubOptions: string;
}

const LocationMenuItemContainer = ({ item, accordionId, itemMenuHeading, itemSubOptions }: Props) => {
  const dispatch = useDispatch();
  const [itemButtonSelected, setItemButtonSelected] = useState(0);
  const [isNavItemCollapsed, setIsNavItemCollapsed] = useState(true);
  const [fetching, setFetching] = useState(false);
  const [rooms, setRooms] = useState<object[]>([]);

  const { uuid } = useParams<{ uuid: string }>();

  const onClick = useCallback(
    (e: any) => {
      e.preventDefault();

      const { id } = e.target;
      const buttonId = Number(id);

      if (rooms?.length === 0) {
        dispatch(listAllRooms(uuid, buttonId, setRooms, setFetching));
      }

      setItemButtonSelected(buttonId);
      setIsNavItemCollapsed(!isNavItemCollapsed);
    },
    [isNavItemCollapsed]
  );

  const onClickSubItem = useCallback(({ roomId }: any) => {
    dispatch(setSelectedRoomId(roomId));
  }, []);

  return (
    <Item
      item={item}
      itemButtonSelected={itemButtonSelected}
      accordionId={accordionId}
      itemMenuHeading={itemMenuHeading}
      itemSubOptions={itemSubOptions}
      isNavItemCollapsed={isNavItemCollapsed}
      subItems={rooms}
      fetching={fetching}
      onClick={onClick}
      onClickSubItem={onClickSubItem}
    />
  );
};

const LocationMenuItemContainerMemo = memo(LocationMenuItemContainer, areEqual);

export { LocationMenuItemContainerMemo as LocationMenuItem };
