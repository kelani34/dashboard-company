import React, { memo, useCallback } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ReportLocation } from 'Components/ReportsAndDocuments';
import { useDispatch, useSelector } from 'react-redux';
import { setSelectedReportLocations } from 'Containers/ReportsAndDocuments/Reports/actions';
import { selectedReportLocationsSelector } from 'Containers/ReportsAndDocuments/Reports/selectors';

interface Props {
  location: any;
}

const ReportLocationContainer = ({ location }: Props) => {
  const dispatch = useDispatch();

  const { id, name } = location;

  const selectedReportLocations = useSelector(selectedReportLocationsSelector, areEqual);

  const onLocationClick = useCallback(() => {
    dispatch(setSelectedReportLocations(id));
  }, [id]);

  return (
    <ReportLocation name={name} selected={selectedReportLocations.includes(id)} onLocationClick={onLocationClick} />
  );
};

const ReportLocationContainerMemo = memo(ReportLocationContainer, areEqual);

export { ReportLocationContainerMemo as ReportLocationContainer };
