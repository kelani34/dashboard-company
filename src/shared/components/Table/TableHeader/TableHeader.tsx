import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  children: ReactNode;
}
const TableHeader = ({ children }: Props) => <thead>{children}</thead>;

const TableHeaderMemo = memo(TableHeader, areEqual);
export { TableHeaderMemo as TableHeader };
