import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { Table, TableBody, TableColumn, TableHeader, TableRow, Th } from 'Components/Table';

import { Icon } from 'Components/Icons';
import classes from './formList.module.css';

interface Props {
  forms: {
    meta: {
      total: number;
    };
    data: any[];
  };
  onDeleteClick: (id: number) => void;
  onClickSort?: (sort: string) => void;
}

const ContractFormList = ({ onClickSort, forms, onDeleteClick }: Props) => (
  <Table className={`table ${classes.projectListWrapper}`}>
    <TableHeader>
      <TableRow>
        <Th>
          <span
            className={classes.thSpan}
            role="button"
            tabIndex={-1}
            onClick={() => onClickSort('-uid')}
            onKeyUp={() => onClickSort('-uid')}
          >
            TEMPLATE NAME
          </span>
        </Th>
        <Th>
          <span
            className={classes.thSpan}
            role="button"
            tabIndex={-1}
            onClick={() => onClickSort('-alias')}
            onKeyUp={() => onClickSort('-alias')}
          >
            DATE CREATED
          </span>
        </Th>

        <Th>
          <span className={classes.thSpan} />
        </Th>

        <Th>
          <span className={classes.thSpan} />
        </Th>

        <Th />
      </TableRow>
    </TableHeader>
    <TableBody>
      {forms?.data.map((item: any, id: number) => (
        <TableRow key={`key${item.id}`}>
          <TableColumn dataId={id}>
            <div className={classes.address}>
              <p className={classes.street}>{item.name}</p>
            </div>
          </TableColumn>

          <TableColumn dataId={id} className={classes.columnContent}>
            <p className={classes.numberAndDate}>{item.created_at}</p>
          </TableColumn>

          <TableColumn dataId={id} className={classes.columnContent}>
            <p className={classes.numberAndDate}>
              <Icon
                type="trash"
                onClick={() => {
                  onDeleteClick(item?.id);
                }}
              />
            </p>
          </TableColumn>

          <TableColumn dataId={id} className={classes.columnContent}>
            <></>
          </TableColumn>
          <TableColumn dataId={id} className={classes.columnContent}>
            <></>
          </TableColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

ContractFormList.defaultProps = {
  onClickSort: null,
};

const ContractFormListMemo = memo(ContractFormList, areEqual);

export { ContractFormListMemo as ContractFormList };
