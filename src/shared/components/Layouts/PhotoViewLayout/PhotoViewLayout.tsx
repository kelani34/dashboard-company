import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import classes from './photoViewLayout.module.css';

interface Props {
  children: ReactNode;
}

const PhotoViewLayout = ({ children }: Props) => <div className={`w-100 ${classes.photoViewBase} `}>{children}</div>;

const PhotoViewLayoutMemo = memo(PhotoViewLayout, areEqual);

export { PhotoViewLayoutMemo as PhotoViewLayout };
