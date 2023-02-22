import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { GuestLayout } from 'Components/Layouts';

interface Props {
  children: ReactNode;
}

const GuestWrapperContainer = ({ children }: Props) => <GuestLayout>{children}</GuestLayout>;

const GuestWrapperContainerMemo = memo(GuestWrapperContainer, areEqual);

export { GuestWrapperContainerMemo as GuestWrapperContainer };
