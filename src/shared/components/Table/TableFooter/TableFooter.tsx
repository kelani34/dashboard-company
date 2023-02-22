import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  children: ReactNode;
}
const TableFooter = ({ children }: Props) => <tfoot>{children}</tfoot>;
const TableFooterMemo = memo(TableFooter, areEqual);
export { TableFooterMemo as TableFooter };
