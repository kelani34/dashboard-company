import { Icon } from 'Components/Icons';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  className?: string;
}

const Next = ({ className }: Props) => <Icon className={className} type="chevronnext" />;

const NextMemo = memo(Next, areEqual);

Next.defaultProps = {
  className: undefined,
};

export { NextMemo as Next };
