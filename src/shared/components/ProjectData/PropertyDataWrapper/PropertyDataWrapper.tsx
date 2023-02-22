import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PropertyDataProvider } from 'Context/PropertyData';
import { PropertyData } from 'Containers/ProjectData';

const PropertyDataWrapper = () => (
  <PropertyDataProvider>
    <PropertyData />
  </PropertyDataProvider>
);

const PropertyDataWrapperMemo = memo(PropertyDataWrapper, areEqual);

export { PropertyDataWrapperMemo as PropertyDataWrapper };
