import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { Spinner } from 'Components/Spinner';
import { Button } from 'Components/Button';

import { CarouselItems } from 'Containers/RocketScan';
import classes from './carousel.module.css';

interface Props {
  photos: any;
  fetching?: boolean;
  onClickNext: (e: any) => void;
  onClickPrevious: (e: any) => void;
}

const Carousal = React.forwardRef(({ photos, fetching, onClickNext, onClickPrevious }: Props, carouselRef: any) => (
  <div
    ref={(ref: HTMLDivElement) => {
      carouselRef.current = ref;
    }}
    className={`carousel slide carousel-fade ${classes.photoViewCarousalBase}`}
    data-bs-interval={false}
  >
    {fetching && <Spinner loading={fetching} />}
    {!fetching && photos.length !== 0 && (
      <>
        <div className={`carousel-inner ${classes.carouselInner}`}>
          <CarouselItems photos={photos} />
        </div>
        <Button className={`${classes.controllerIcon} ${classes.prevIcon}`} onClick={onClickPrevious}>
          <Icon type="carouselcontrollerprev" />
        </Button>
        <Button className={`${classes.controllerIcon} ${classes.nextIcon}`} onClick={onClickNext}>
          <Icon type="carouselcontrollernext" />
        </Button>
      </>
    )}
    {!fetching && photos.length === 0 && (
      <p className={classes.errorMessage}>
        We could not find the photo you were looking for! Please select a new photo or try again later.
      </p>
    )}
  </div>
));

Carousal.defaultProps = {
  fetching: false,
};

const CarousalMemo = memo(Carousal, areEqual);

export { CarousalMemo as Carousal };
