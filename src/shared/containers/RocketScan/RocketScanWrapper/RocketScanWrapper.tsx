import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RocketScanWrapper } from 'Components/RocketScan';

interface Props {
  children: ReactNode;
}

const RocketScanWrapperContainer = ({ children }: Props) => <RocketScanWrapper>{children}</RocketScanWrapper>;

const RocketScanWrapperContainerMemo = memo(RocketScanWrapperContainer, areEqual);

export { RocketScanWrapperContainerMemo as RocketScanWrapperContainer };
