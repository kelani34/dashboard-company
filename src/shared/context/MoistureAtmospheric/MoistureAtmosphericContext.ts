import { createContext, useContext } from 'react';
import { useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectSelector, propertySelector } from 'Containers/RocketScan/selectors';

export const MoistureAtmosphericContext = createContext({});

export const MoistureAtmosphericFunctions = () => {
  const project = useSelector(projectSelector, areEqual);
  const property = useSelector(propertySelector, areEqual);

  return { project, property };
};

export const useMoistureAtmosphericFunctions = () => useContext(MoistureAtmosphericContext);
