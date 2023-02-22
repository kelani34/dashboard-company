import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { UserProfileWrapper } from 'Components/Profiles';
import { About } from 'Components/Profiles/About';

const AboutContainer = () => (
  <UserProfileWrapper tab="about">
    <About />
  </UserProfileWrapper>
);

const AboutContainerMemo = memo(AboutContainer, areEqual);

export { AboutContainerMemo as AboutContainer };
