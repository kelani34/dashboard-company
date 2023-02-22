import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PhotoModal } from 'Containers/PhotoViewCarousel/Models';
import { useSelector } from 'react-redux';
import { CarouselItem } from 'Components/PhotoViewCarousal';
import { selectedPhotoSelector } from 'Containers/RocketScan/PhotoView/Carousel/selectors';

interface Props {
  photos: any;
}

const CarouselItemsContainer = ({ photos }: Props) => {
  const selectedPhoto: PhotoModal = useSelector(selectedPhotoSelector, areEqual);

  const { id: selectedPhotoId } = selectedPhoto;

  return (
    photos.length > 0 &&
    photos.map(
      ({ id, is_ir: isIr, file_name: photoName, sizes: { raw: originalPhoto }, photo: irPhoto }: PhotoModal) => (
        <CarouselItem
          key={id}
          id={id}
          selectedPhotoId={selectedPhotoId}
          photoName={photoName}
          originalPhoto={originalPhoto}
          irPhoto={irPhoto}
          isIr={isIr}
        />
      )
    )
  );
};

const CarouselItemsContainerMemo = memo(CarouselItemsContainer, areEqual);

export { CarouselItemsContainerMemo as CarouselItems };
