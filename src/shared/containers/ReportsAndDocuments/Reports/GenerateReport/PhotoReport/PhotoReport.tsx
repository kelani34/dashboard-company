import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { PhotoReportForm, GenerateReportWrapper } from 'Components/ReportsAndDocuments';
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

const PhotoReportContainer = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const project = useSelector(projectSelector, areEqual);
  const fetching = useSelector(reportCreatingSelector, areEqual);
  const reportCreated = useSelector(reportCreatedSelector, areEqual);
  const selectedLocations = useSelector(selectedReportLocationsSelector, areEqual);

  const [name, setName] = useState('');
  const [format, setFormat] = useState('compact');
  const [unitType, setUnitType] = useState('full_project');
  const [photosType, setPhotosType] = useState('all');
  const [notesType, setNotesType] = useState('all');
  const [photoNotesType, setPhotoNotesType] = useState('all');
  const [damagedMaterials, setDamagedMaterials] = useState('yes');

  const errors = {
    title: useSelector(titleErrorSelector, areEqual),
  };

  const onChangeTitle = useCallback(({ target: { value } }: any) => {
    setName(value);
  }, []);

  // this one uses id and not value because the format choice doesn't use radio buttons
  const onSelectFormat = useCallback(({ currentTarget: { id } }: any) => {
    setFormat(id);
  }, []);

  const onUnitTypeClick = useCallback(({ currentTarget: { value } }: any) => {
    setUnitType(value);
  }, []);

  const onPhotosTypeClick = useCallback(({ currentTarget: { value } }: any) => {
    setPhotosType(value);
  }, []);

  const onNotesTypeClick = useCallback(({ currentTarget: { value } }: any) => {
    setNotesType(value);
  }, []);

  const onPhotoNotesTypeClick = useCallback(({ currentTarget: { value } }: any) => {
    setPhotoNotesType(value);
  }, []);

  const onDamagedMaterialsClick = useCallback(({ currentTarget: { value } }: any) => {
    setDamagedMaterials(value);
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();

      if (project?.id) {
        const { id: projectId } = project;

        const settings = JSON.stringify({
          format,
          unit_type: unitType,
          photos: photosType,
          notes: notesType,
          photo_notes: photoNotesType,
          damaged_materials: damagedMaterials,
          locations: unitType === 'full_project' ? [] : selectedLocations,
        });

        dispatch(createReport(projectId, { name, settings }));
      }
    },
    [name, project, format, unitType, photosType, notesType, photoNotesType, damagedMaterials, selectedLocations]
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
      <PhotoReportForm
        title={name}
        format={format}
        unitType={unitType}
        photosType={photosType}
        notesType={notesType}
        photoNotesType={photoNotesType}
        damagedMaterials={damagedMaterials}
        formErrors={errors}
        fetching={fetching}
        onUnitTypeClick={onUnitTypeClick}
        onChangeTitle={onChangeTitle}
        onSelectFormat={onSelectFormat}
        onPhotosTypeClick={onPhotosTypeClick}
        onNotesTypeClick={onNotesTypeClick}
        onPhotoNotesTypeClick={onPhotoNotesTypeClick}
        onDamagedMaterialsClick={onDamagedMaterialsClick}
        onFormSubmit={onFormSubmit}
      />
    </GenerateReportWrapper>
  );
};

const PhotoReportContainerMemo = memo(PhotoReportContainer, areEqual);

export { PhotoReportContainerMemo as PhotoReport };
