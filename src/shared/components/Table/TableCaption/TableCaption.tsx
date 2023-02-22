import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  children: ReactNode;
}
const TableCaption = ({ children }: Props) => <caption>{children}</caption>;
const TableCaptionMemo = memo(TableCaption, areEqual);
export { TableCaptionMemo as TableCaption };
