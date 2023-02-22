import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

interface Props {
  className?: string;
  children: ReactNode;
}

const Table = ({ className, children }: Props) => <table className={className}>{children}</table>;

Table.defaultProps = {
  className: undefined,
};

const TableMemo = memo(Table, areEqual);

export { TableMemo as Table };
