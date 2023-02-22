import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { PhotoShareLayout } from 'Components/Layouts';
import { PhotoShareProvider } from 'Context/PhotoShare/PhotoShareProvider';

interface Props {
  children: ReactNode;
}

const PhotoShareWrapperContainer = ({ children }: Props) => (
  <PhotoShareProvider>
    <PhotoShareLayout>{children}</PhotoShareLayout>
  </PhotoShareProvider>
);

const PhotoShareWrapperContainerMemo = memo(PhotoShareWrapperContainer, areEqual);

export { PhotoShareWrapperContainerMemo as PhotoShareWrapperContainer };
