import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

import { PurpleButton } from "Components/Button";
import { Icon } from "Components/Icons";
import classes from "./photosPlaceholder.module.css";

interface Props {
  roomName?: string;
  onButtonClick?: () => void;
}

const PhotosPlaceholderContainer = ({ roomName, onButtonClick }: Props) => (
  <div className={`d-flex flex-column justify-content-center align-items-center ${classes.contentWrapper}`}>
    <div className={classes.content}>
      <div className={classes.heading}>No photos yet</div>

      <div className="w-100 d-flex justify-content-center mb-5">
        <Icon type="rocketemblem" />
      </div>

      <PurpleButton id="add-newplocation" type="button" onClick={onButtonClick}>
        Add Photos to {roomName}
      </PurpleButton>
    </div>
  </div>
);

PhotosPlaceholderContainer.defaultProps = {
  roomName: undefined,
  onButtonClick: undefined,
};

const PhotosPlaceholderContainerMemo = memo(PhotosPlaceholderContainer, areEqual);

export { PhotosPlaceholderContainerMemo as PhotosPlaceholderContainer };
