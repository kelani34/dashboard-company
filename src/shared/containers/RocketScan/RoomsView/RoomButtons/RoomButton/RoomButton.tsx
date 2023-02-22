import React, { memo, useCallback, useEffect, useRef } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { RoomButton } from 'Components/Button/RoomButton';
import { RoomIcon } from 'Components/Icons';

import { useOnScreen } from 'Hooks/useOnScreen';
import { useDispatch, useSelector } from 'react-redux';
import { listLocationRooms } from 'Containers/RocketScan/RoomsView/Rooms/actions';
import { currentPageSelector, lastPageSelector } from 'Containers/RocketScan/RoomsView/Rooms/selectors';
import classes from './roomButton.module.css';

interface Props {
  id?: string;
  locationId: number;
  iconType: string;
  isActive: boolean;
  isLastItem?: boolean;
  children: any;
  onClick?: (e: any) => void;
}

const RoomButtonContainer = ({ id, locationId, iconType, isActive, isLastItem, children, onClick }: Props) => {
  const dispatch = useDispatch();
  const ref = useRef(null);

  const isOnScreen = useOnScreen(ref);

  // selectors
  const currentPage = useSelector(currentPageSelector, areEqual);
  const lastPage = useSelector(lastPageSelector, areEqual);

  // lazy load next rooms, passed from the parent
  useEffect(() => {
    if (isOnScreen && isLastItem && locationId) {
      if (currentPage < lastPage) {
        dispatch(listLocationRooms(locationId, currentPage + 1));
      }
    }
  }, [isOnScreen, locationId, currentPage, lastPage]);

  const onRoomButtonClick = useCallback(() => {
    if (onClick) onClick(id);
  }, []);

  return (
    <RoomButton ref={ref} id={id} className={classes.roomButtonWrapper} isActive={isActive} onClick={onRoomButtonClick}>
      <div className={classes.content}>
        <RoomIcon type={iconType} className={classes.iconContent} />
        <span className={classes.text}>{children}</span>
      </div>
    </RoomButton>
  );
};

RoomButtonContainer.defaultProps = {
  id: undefined,
  isLastItem: false,
  onClick: undefined,
};

const RoomButtonContainerMemo = memo(RoomButtonContainer, areEqual);
export { RoomButtonContainerMemo as RoomButton };
