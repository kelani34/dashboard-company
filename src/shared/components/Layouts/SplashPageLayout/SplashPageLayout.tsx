import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

interface Props {
  children: ReactNode;
}

const SplashPageLayout = ({ children }: Props) => (
  <div className="container-fluid d-flex justify-content-center align-items-center">{children}</div>
);

const SplashPageLayoutMemo = memo(SplashPageLayout, areEqual);

export { SplashPageLayoutMemo as SplashPageLayout };
