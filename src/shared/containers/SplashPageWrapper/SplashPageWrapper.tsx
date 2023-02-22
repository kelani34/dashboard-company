import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { SplashPageLayout } from 'Components/Layouts';

interface Props {
  children: ReactNode;
}

const SplashPageWrapperContainer = ({ children }: Props) => <SplashPageLayout>{children}</SplashPageLayout>;

const SplashPageWrapperContainerMemo = memo(SplashPageWrapperContainer, areEqual);

export { SplashPageWrapperContainerMemo as SplashPageWrapper };
