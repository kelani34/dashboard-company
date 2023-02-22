import React, { memo } from "react";

import { GalleryHeader } from "Containers/GalleryHeader";
import { PhotoGallery } from "Containers/PhotoGallery";

import { areEqual } from "Utils/equalityChecks";
import { useSelector } from "react-redux";
import { selectedPhotoFilterSelector } from "Containers/Project/Unit/selector";
import classes from "./roomGallery.module.css";

interface Props {
  className?: string;
  roomId?: number;
  levelName?: string;
  roomName: string;
}

const RoomGalleryContainer = ({ className, roomId, levelName, roomName }: Props) => {
  const selectedPhotoFilter = useSelector(selectedPhotoFilterSelector, areEqual);

  return (
    <div
      className={`d-flex flex-column justify-content-flex-start w-100 py-0 px-3 ${classes.containerWrapper} ${className}`}
      id={roomId.toString()}
    >
      <GalleryHeader roomId={roomId} roomName={roomName} levelName={levelName} />
      <PhotoGallery
        roomId={roomId}
        albumId={1}
        title="Damage Assessment"
        hide={selectedPhotoFilter !== "damageAssessment" && selectedPhotoFilter !== "allPhotos"}
      />
      <PhotoGallery
        roomId={roomId}
        albumId={2}
        title="Daily Progress"
        hide={selectedPhotoFilter !== "dailyProgress" && selectedPhotoFilter !== "allPhotos"}
      />
      <PhotoGallery
        roomId={roomId}
        albumId={3}
        title="Pre-Existing Damages"
        hide={selectedPhotoFilter !== "preExistingDamages" && selectedPhotoFilter !== "allPhotos"}
      />
    </div>
  );
};

RoomGalleryContainer.defaultProps = {
  className: undefined,
  roomId: undefined,
  levelName: undefined,
};

const RoomGalleryContainerMemo = memo(RoomGalleryContainer, areEqual);

export { RoomGalleryContainerMemo as RoomGallery };
