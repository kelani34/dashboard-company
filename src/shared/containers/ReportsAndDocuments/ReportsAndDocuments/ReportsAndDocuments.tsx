import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ReportsAndDocumentsWrapper } from 'Components/ReportsAndDocuments';
import { Reports } from 'Containers/ReportsAndDocuments';

const ReportsAndDocumentsContainer = () => (
  <ReportsAndDocumentsWrapper>
    <Reports />
  </ReportsAndDocumentsWrapper>
);

const ReportsAndDocumentsContainerMemo = memo(ReportsAndDocumentsContainer, areEqual);

export { ReportsAndDocumentsContainerMemo as ReportsAndDocumentsContainer };
