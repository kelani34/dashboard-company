import React, { memo, useCallback, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Reports, ChooseReportTypeModal } from 'Components/ReportsAndDocuments';
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { projectIdSelector } from 'Containers/RocketScan/selectors';

const ReportsContainer = () => {
  const history = useHistory();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const projectId = useSelector(projectIdSelector, areEqual);

  const onPhotoReportClick = useCallback(
    () => history.push(`/projects/${projectId}/reports/generate/photo`),
    [projectId]
  );

  const onDryingReportClick = useCallback(
    () => history.push(`/projects/${projectId}/reports/generate/drying`),
    [projectId]
  );

  const onClickGenerateReport = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const onModalCloseClick = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  return (
    <>
      <Reports onClickGenerateReport={onClickGenerateReport} />
      <ChooseReportTypeModal
        isOpen={isModalOpen}
        onPhotoReportClick={onPhotoReportClick}
        onDryingReportClick={onDryingReportClick}
        modalCloseClick={onModalCloseClick}
      />
    </>
  );
};

const ReportsContainerMemo = memo(ReportsContainer, areEqual);

export { ReportsContainerMemo as ReportsContainer };
