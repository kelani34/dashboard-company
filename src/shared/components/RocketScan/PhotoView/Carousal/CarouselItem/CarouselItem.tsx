import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import classes from './carouselItem.module.css';

interface Props {
  id: number;
  selectedPhotoId: number;
  photoName: string;
  originalPhoto: string;
  isIr: boolean;
  irPhoto?: any;
}

const getIrPhoto = (irPhoto: any) => irPhoto?.sizes?.raw || '';

const CarouselItem = ({ id, selectedPhotoId, photoName, originalPhoto, isIr, irPhoto }: Props) => (
  <div
    className={`carousel-item ${classes.carouselItem} ${selectedPhotoId === id ? 'active' : ''} ${
      isIr ? classes.irExists : ''
    }`}
  >
    <img src={originalPhoto} alt={photoName} />
    {isIr && <img src={getIrPhoto(irPhoto)} alt={photoName} />}
  </div>
);

CarouselItem.defaultProps = {
  irPhoto: undefined,
};

const CarouselItemMemo = memo(CarouselItem, areEqual);

export { CarouselItemMemo as CarouselItem };
