import { Spinner } from 'Components/Spinner';
import { TabContent } from 'Components/Tabs';
import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ContractFormList } from '../FormList';

import classes from './myContractForm.module.css';

interface Props {
  fetching: boolean;
  forms: {
    meta: {
      total: number;
    };
    data: any[];
  };
  onDeleteClick: (id: number) => void;
}

const MyContractForm = ({ forms, fetching, onDeleteClick }: Props) => (
  <TabContent key="tab-content-wip-projects" id="my-projects" className="show active position-relative">
    <div className={classes.projectContent}>
      {fetching && <Spinner loading />}
      {!fetching && <ContractFormList forms={forms} onDeleteClick={onDeleteClick} />}
    </div>
    {forms?.meta?.total >= 15 && (
      <></>
      // <ProjectsPagination initialPage={initialPage} pageCount={pageCount} onPageChange={onPageChange} />
    )}
  </TabContent>
);

MyContractForm.defaultProps = {};

const MyContractFormMemo = memo(MyContractForm, areEqual);

export { MyContractFormMemo as MyContractForm };
