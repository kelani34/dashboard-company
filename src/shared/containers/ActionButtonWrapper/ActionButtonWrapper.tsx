import React, { memo, ReactNode, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';

interface Props {
  children: ReactNode;
  item: any;
  disabled?: boolean;
  onClick: (e: any) => void;
}

const ActionButtonWrapperContainer = ({ children, item, disabled, onClick }: Props) => {
  const onItemClick = useCallback(() => onClick(item), [item]);

  return (
    <Button onClick={onItemClick} disabled={disabled}>
      {children}
    </Button>
  );
};

ActionButtonWrapperContainer.defaultProps = {
  disabled: false,
};

const ActionButtonWrapperContainerMemo = memo(ActionButtonWrapperContainer, areEqual);

export { ActionButtonWrapperContainerMemo as ActionButtonWrapperContainer };
