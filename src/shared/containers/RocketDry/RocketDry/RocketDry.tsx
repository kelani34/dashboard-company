import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { RocketDryWrapper } from 'Components/RocketDry';
import { RocketDryBody } from 'Containers/RocketDry';
import { ProjectDataHeader } from 'Containers/ProjectData';

const RocketDry = () => (
  <RocketDryWrapper>
    <ProjectDataHeader />
    <RocketDryBody />
  </RocketDryWrapper>
);

const RocketDryMemo = memo(RocketDry, areEqual);

export { RocketDryMemo as RocketDry };
