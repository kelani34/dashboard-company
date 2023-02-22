import React, { memo, useCallback } from "react";

import { areEqual } from "Utils/equalityChecks";
import { RoomButton } from "Components/Button/RoomButton";
import { Icon } from "Components/Icons";

import classes from "./roomButton.module.css";

interface Props {
  id?: string;
  iconType: string;
  isActive: boolean;
  children: any;
  onClick?: (e: any) => void;
}

const RoomButtonContainer = ({ id, iconType, isActive, children, onClick }: Props) => {
  const onRoomButtonClick = useCallback(() => {
    if (onClick) onClick(id);
  }, []);

  return (
    <RoomButton id={id} className={classes.roomButtonWrapper} isActive={isActive} onClick={onRoomButtonClick}>
      <Icon type={iconType} className={classes.iconContent} />
      {children}
    </RoomButton>
  );
};

RoomButtonContainer.defaultProps = {
  id: undefined,
  onClick: undefined,
};

const RoomButtonContainerMemo = memo(RoomButtonContainer, areEqual);
export { RoomButtonContainerMemo as RoomButton };
