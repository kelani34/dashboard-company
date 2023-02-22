import React, { memo, ReactNode } from "react";

import { areEqual } from "Utils/equalityChecks";

import classes from "./photoShareLayout.module.css";

interface Props {
  children: ReactNode;
}

const PhotoShareLayout = ({ children }: Props) => (
  <div className={`d-flex flex-row w-100 ${classes.photoShareBase}`}>{children}</div>
);

const PhotoShareLayoutMemo = memo(PhotoShareLayout, areEqual);

export { PhotoShareLayoutMemo as PhotoShareLayout };
