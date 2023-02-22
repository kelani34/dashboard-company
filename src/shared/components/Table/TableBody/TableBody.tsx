import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  children: ReactNode;
}
const TableBody = ({ children }: Props) => <tbody>{children}</tbody>;

const TableBodyMemo = memo(TableBody, areEqual);
export { TableBodyMemo as TableBody };
