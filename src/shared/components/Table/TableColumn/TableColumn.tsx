import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  dataId?: number;
  children: ReactNode;
  className?: string;
  tdClassName?: string;
  onClick?: (e: any) => void;
  tdOnClick?: (e: any) => void;
}

const TableColumn = ({ dataId, children, className, tdClassName, onClick, tdOnClick }: Props) => (
  /* eslint-disable-next-line */
  <td className={tdClassName} role="button" data-id={dataId} onClick={tdOnClick} onKeyUp={tdOnClick}>
    <div className={className} role="button" data-id={dataId} onClick={onClick} onKeyUp={onClick} tabIndex={0}>
      {children}
    </div>
  </td>
);

TableColumn.defaultProps = {
  dataId: null,
  onClick: null,
  tdOnClick: null,
  className: undefined,
  tdClassName: undefined,
};

const TableColumnMemo = memo(TableColumn, areEqual);
export { TableColumnMemo as TableColumn };
