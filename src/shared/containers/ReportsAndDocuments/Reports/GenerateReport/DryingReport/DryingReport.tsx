import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { DryingReportForm, GenerateReportWrapper } from 'Components/ReportsAndDocuments';
import { useDispatch, useSelector } from 'react-redux';
import { createReport, setReportCreated } from 'Containers/ReportsAndDocuments/Reports/actions';
import { projectSelector } from 'Containers/RocketScan/selectors';
import {
  reportCreatedSelector,
  reportCreatingSelector,
  selectedReportLocationsSelector,
  titleErrorSelector,
} from 'Containers/ReportsAndDocuments/Reports/selectors';
import { useHistory } from 'react-router-dom';

const DryingReportContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(projectSelector, areEqual);
  const fetching = useSelector(reportCreatingSelector, areEqual);
  const reportCreated = useSelector(reportCreatedSelector, areEqual);
  const selectedLocations = useSelector(selectedReportLocationsSelector, areEqual);

  const [name, setName] = useState('');
  const [showExternal, setShowExternal] = useState('yes');
  const [showInternal, setShowInternal] = useState('yes');
  const [showMaterialMoisture, setShowMaterialMoisture] = useState('yes');
  const [showEquipment, setShowEquipment] = useState('yes');
  const [unitType, setUnitType] = useState('full_project');

  const errors = {
    title: useSelector(titleErrorSelector, areEqual),
  };

  const onChangeTitle = useCallback(({ target: { value } }: any) => {
    setName(value);
  }, []);

  const onExternalClick = useCallback(({ currentTarget: { value } }: any) => {
    setShowExternal(value);
  }, []);

  const onInternalClick = useCallback(({ currentTarget: { value } }: any) => {
    setShowInternal(value);
  }, []);

  const onMaterialMoistureClick = useCallback(({ currentTarget: { value } }: any) => {
    setShowMaterialMoisture(value);
  }, []);

  const onEquipmentClick = useCallback(({ currentTarget: { value } }: any) => {
    setShowEquipment(value);
  }, []);

  const onUnitTypeClick = useCallback(({ currentTarget: { value } }: any) => {
    setUnitType(value);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (project?.id) {
        const { id: projectId } = project;

        const settings = JSON.stringify({
          format: 'rocketdry',
          atmospheric_external: showExternal,
          atmospheric_internal: showInternal,
          moisture_logs: showMaterialMoisture,
          equipment_list: showEquipment,
          locations: unitType === 'full_project' ? [] : selectedLocations,
        });

        dispatch(createReport(projectId, { name, settings }));
      }
    },
    [name, project, unitType, selectedLocations, showExternal, showInternal, showMaterialMoisture, showEquipment]
  );

  useEffect(() => {
    if (reportCreated) {
      const { id: projectId } = project;

      history.push(`/projects/${projectId}/rocketreports`);
    }

    return () => {
      if (reportCreated) {
        dispatch(setReportCreated(false));
      }
    };
  }, [reportCreated, project]);

  return (
    <GenerateReportWrapper>
      <DryingReportForm
        title={name}
        showExternal={showExternal}
        showInternal={showInternal}
        showMaterialMoisture={showMaterialMoisture}
        showEquipment={showEquipment}
        unitType={unitType}
        formErrors={errors}
        fetching={fetching}
        onChangeTitle={onChangeTitle}
        onExternalClick={onExternalClick}
        onInternalClick={onInternalClick}
        onMaterialMoistureClick={onMaterialMoistureClick}
        onEquipmentClick={onEquipmentClick}
        onUnitTypeClick={onUnitTypeClick}
        onFormSubmit={onFormSubmit}
      />
    </GenerateReportWrapper>
  );
};

const DryingReportContainerMemo = memo(DryingReportContainer, areEqual);

export { DryingReportContainerMemo as DryingReport };
