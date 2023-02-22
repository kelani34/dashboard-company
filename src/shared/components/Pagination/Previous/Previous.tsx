import { Icon } from 'Components/Icons';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  className?: string;
}

const Previous = ({ className }: Props) => <Icon className={className} type="chevronprevious" />;

const PreviousMemo = memo(Previous, areEqual);

Previous.defaultProps = {
  className: undefined,
};

export { PreviousMemo as Previous };
