import React, { memo, ReactNode } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  dataId?: number;
  children: ReactNode;
  onClick?: (e: any) => void;
}

const TableRow = ({ dataId, children, onClick }: Props) => (
  <tr data-id={dataId} onClick={onClick}>
    {children}
  </tr>
);

TableRow.defaultProps = {
  dataId: null,
  onClick: null,
};

const TableRowMemo = memo(TableRow, areEqual);
export { TableRowMemo as TableRow };
