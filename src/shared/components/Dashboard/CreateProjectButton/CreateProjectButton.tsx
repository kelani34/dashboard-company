import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Icon } from 'Components/Icons';
import { PurpleButton } from 'Components/Button';

interface Props {
  className?: string;
}

const CreateProjectButton = ({ className }: Props) => (
  // <PurpleButton className={className || ""} onClick={onClick}>
  //   Create Project <Icon type="plus" />
  // </PurpleButton>
  <>{className}</>
);

CreateProjectButton.defaultProps = {
  className: null,
};

const CreateProjectButtonButtonMemo = memo(CreateProjectButton, areEqual);

export { CreateProjectButtonButtonMemo as CreateProjectButton };
