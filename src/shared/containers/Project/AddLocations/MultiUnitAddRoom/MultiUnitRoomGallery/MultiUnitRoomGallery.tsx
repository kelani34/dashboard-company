import React, { memo } from "react";

import { GalleryHeader } from "Containers/GalleryHeader";

import { areEqual } from "Utils/equalityChecks";
import { useSelector } from "react-redux";
import { selectedPhotoFilterSelector } from "Containers/Project/Unit/selector";
import { MultiUnitPhotoGallery } from "Containers/Project/AddLocations/MultiUnitAddRoom";

import classes from "./multiUnitRoomGallery.module.css";

interface Props {
  className?: string;
  roomId?: number;
  levelName?: string;
  roomName: string;
}

const MultiUnitRoomGalleryContainer = ({ className, roomId, levelName, roomName }: Props) => {
  const selectedPhotoFilter = useSelector(selectedPhotoFilterSelector, areEqual);

  return (
    <div
      className={`d-flex flex-column justify-content-flex-start w-100 py-0 px-3 ${classes.containerWrapper} ${className}`}
      id={roomId.toString()}
    >
      <GalleryHeader roomId={roomId} roomName={roomName} levelName={levelName} />
      <MultiUnitPhotoGallery
        roomId={roomId}
        albumId={1}
        title="Damage Assessment"
        hide={selectedPhotoFilter !== "damageAssessment" && selectedPhotoFilter !== "allPhotos"}
      />
      <MultiUnitPhotoGallery
        roomId={roomId}
        albumId={2}
        title="Daily Progress"
        hide={selectedPhotoFilter !== "dailyProgress" && selectedPhotoFilter !== "allPhotos"}
      />
      <MultiUnitPhotoGallery
        roomId={roomId}
        albumId={3}
        title="Pre-Existing Damages"
        hide={selectedPhotoFilter !== "preExistingDamages" && selectedPhotoFilter !== "allPhotos"}
      />
    </div>
  );
};

MultiUnitRoomGalleryContainer.defaultProps = {
  className: undefined,
  roomId: undefined,
  levelName: undefined,
};

const MultiUnitRoomGalleryContainerMemo = memo(MultiUnitRoomGalleryContainer, areEqual);

export { MultiUnitRoomGalleryContainerMemo as MultiUnitRoomGallery };
