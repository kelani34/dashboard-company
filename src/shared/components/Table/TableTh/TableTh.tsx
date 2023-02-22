import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  scope?: string;
  children?: ReactNode;
}
const Th = ({ scope, children }: Props) => <th scope={scope}>{children}</th>;

Th.defaultProps = {
  scope: undefined,
  children: undefined,
};

const ThMemo = memo(Th, areEqual);
export { ThMemo as Th };
