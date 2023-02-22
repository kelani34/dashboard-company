import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { useHistory } from 'react-router-dom';

import { CreateProjectButton } from 'Components/Dashboard';

interface Props {
  className?: string;
}

const CreateProjectButtonContainer = ({ className }: Props) => {
  const history = useHistory();

  return <CreateProjectButton className={className} />;
};

CreateProjectButtonContainer.defaultProps = {
  className: null,
};

const CreateProjectButtonContainerMemo = memo(CreateProjectButtonContainer, areEqual);

export { CreateProjectButtonContainerMemo as CreateProjectButtonContainer };
