/* eslint-disable */
import React, { memo, useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { areEqual } from "Utils/equalityChecks";
import { resetToast } from "./actions";

import { toastSelector } from "./selector";

import { PhotoErrorToast } from "Components/PhotoErrorToast";

export interface Props {
  id?: string;
  className?: string;
}

const PhotoErrorToastContainer = ({ id, className }: Props) => {
  const dispatch = useDispatch();

  const { show, timeout } = useSelector(toastSelector);

  const closeToast = useCallback(() => {
    if (show) {
      dispatch(resetToast());
    }
  }, [show]);

  useEffect(() => {
    if (show)
      //Close it if it's showing.
      setTimeout(() => {
        closeToast();
      }, timeout);
  }, [show]);

  return <PhotoErrorToast id={id} className={className} isDisplayed={show} closeToast={closeToast} />;
};

const PhotoErrorToastContainerMemo = memo(PhotoErrorToastContainer, areEqual);
export { PhotoErrorToastContainerMemo as PhotoErrorToast };
