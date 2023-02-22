import React, { memo } from "react";

import { areEqual } from "Utils/equalityChecks";
import classes from "./image.place.holder.module.css";

interface Props {
  placeHolderClassName?: string;
}

const ImagePlaceHolder = ({ placeHolderClassName }: Props) => (
  <div
    className={`d-flex align-items-center justify-content-center ${classes.dimensions} ${classes.pointer} ${
      classes.loadingImageBackground
    } ${placeHolderClassName || ""}`}
  />
);

ImagePlaceHolder.defaultProps = {
  placeHolderClassName: undefined,
};
const ImagePlaceHolderMemo = memo(ImagePlaceHolder, areEqual);
export { ImagePlaceHolderMemo as ImagePlaceHolder };
