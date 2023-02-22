import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { projectClassifications } from 'Utils/data';
import { PropertyDataEdit } from 'Components/ProjectData/PropertyData';
import { usePropertyDataFunctions } from 'Context/PropertyData';

import { editPropertyData, updateProjectTypeId, setPropertyDataEdited, createPropertyForNewProject } from '../actions';
import { buildingNameErrorSelector, yearBuiltErrorSelector } from '../selectors';

interface Props {
  projectId: number;
  invalid?: boolean;
  isResidential: boolean;
  isCommercial: boolean;
  buildingName: string;
  yearBuilt: string;
  asbestosStatusId?: any;
  projectTypeId: number;
  projectTypeName: string;
}

const PropertyDataEditContainer = ({
  projectId,
  invalid,
  isResidential,
  isCommercial,
  buildingName,
  yearBuilt,
  asbestosStatusId,
  projectTypeId,
  projectTypeName,
}: Props) => {
  const dispatch = useDispatch();

  // selectors from context
  const {
    project,
    projectTypes,
    asbestosStatuses,
    property,
    propertyDataEdited,
    setEditIsOpen,
    onEditButtonClick,
  }: any = usePropertyDataFunctions();

  const [projectTypeOptions, setProjectTypeOptions] = useState([]);
  const [classificationOptions, setClassificationOptions] = useState([]);

  const [selectedProjectTypeInput, setSelectedProjectTypeInput] = useState(projectTypeId);
  const [selectedProjectTypeName, setSelectedProjectTypeName] = useState('');

  const [isResidentialInput, setIsResidentialInput] = useState(isResidential);
  const [isCommercialInput, setIsCommercialInput] = useState(isCommercial);
  const [classificationId, setClassificationId] = useState(0);
  const [yearBuiltInput, setYearBuiltInput] = useState(yearBuilt);
  const [buildingNameInput, setBuildingNameInput] = useState(buildingName);
  const [asbestosStatusInput, setAsbestosStatusInput] = useState(asbestosStatusId);

  const [asbestosStatusOptions, setAsbestosStatusOptions] = useState(asbestosStatuses);

  const errors = {
    buildingName: useSelector(buildingNameErrorSelector, areEqual),
    yearBuilt: useSelector(yearBuiltErrorSelector, areEqual),
  };

  const getClassificationId = useCallback((isResidential: boolean, isCommercial: boolean) => {
    if (isResidential) {
      if (isCommercial) {
        return 3;
      }
      return 1;
    }
    return isCommercial ? 2 : 0;
  }, []);

  useEffect(() => {
    if (projectId && projectTypes?.length > 0) {
      setSelectedProjectTypeInput(projectTypeId);
      setSelectedProjectTypeName(projectTypeName);
      setProjectTypeOptions(projectTypes);
      setClassificationOptions(projectClassifications);
      setAsbestosStatusOptions(asbestosStatuses);
    }
  }, [project, propertyDataEdited]);

  useEffect(() => {
    if (propertyDataEdited) {
      setSelectedProjectTypeInput(projectTypeId);
      setSelectedProjectTypeName(projectTypeName);
    }
  }, [project, propertyDataEdited]);

  // setting classification based on id of button selected in OptionToolBar
  useEffect(() => {
    if (classificationId === 1) {
      // residential
      setIsResidentialInput(true);
      setIsCommercialInput(false);
    } else if (classificationId === 2) {
      // commercial
      setIsResidentialInput(false);
      setIsCommercialInput(true);
    } else if (classificationId === 3) {
      // both
      setIsResidentialInput(true);
      setIsCommercialInput(true);
    } else {
      // no selection on new property
      setIsResidentialInput(false);
      setIsCommercialInput(false);
    }
  }, [classificationId, isResidential, isCommercial]);

  // sets id of property classification - Residential, Commercial, or Both
  useEffect(() => {
    if (property?.id) {
      setClassificationId(getClassificationId(isResidential, isCommercial));
    }
  }, []);

  // swtiches from edit mode to view mode if there are no errors in form
  useEffect(() => {
    if (propertyDataEdited) {
      setEditIsOpen(false);
    }
    return () => {
      if (propertyDataEdited) {
        dispatch(setPropertyDataEdited(false));
      }
    };
  }, [propertyDataEdited]);

  const onChangeBuildingName = useCallback(({ target: { value } }) => {
    setBuildingNameInput(value);
  }, []);

  const onChangeYearBuilt = useCallback(({ target: { value } }) => {
    let type = value;
    if (value === '') {
      type = null;
    }
    setYearBuiltInput(type);
  }, []);

  const onSaveButtonClick = useCallback(
    (e: any) => {
      e.preventDefault();

      // update project classification, asbestos status, year built and building name
      // project type will be updated with a different api call (updateProjectTypeId)
      const propertyDataForEdit = {
        name: buildingNameInput,
        is_residential: isResidentialInput,
        is_commercial: isCommercialInput,
        year_built: yearBuiltInput,
        asbestos_status_id: asbestosStatusInput,
      };

      // Remove asbestos_status_id property if user does not make a selection
      if (asbestosStatusInput === null) {
        delete propertyDataForEdit.asbestos_status_id;
      }

      if (property?.id) {
        dispatch(editPropertyData(property.id, propertyDataForEdit));

        if (projectTypeId !== selectedProjectTypeInput) {
          dispatch(
            updateProjectTypeId(project.id, {
              project_status_id: project.projectStatus.id,
              project_type_id: selectedProjectTypeInput,
              address_id: project.address.id,
            })
          );
        }
      } else {
        // For when creating a new project then inputing property data before selecting a project type
        // Dev note - still may need some rules added to api as project type does not handle null when used later in other conditions
        dispatch(createPropertyForNewProject(project.id, propertyDataForEdit));

        if (selectedProjectTypeInput) {
          dispatch(
            updateProjectTypeId(project.id, {
              project_status_id: project.projectStatus.id,
              project_type_id: selectedProjectTypeInput,
              address_id: project.address.id,
            })
          );
        }
      }
    },
    [
      project,
      buildingNameInput,
      isResidentialInput,
      isCommercialInput,
      yearBuiltInput,
      asbestosStatusInput,
      selectedProjectTypeInput,
    ]
  );

  return (
    <PropertyDataEdit
      invalid={invalid}
      formErrors={errors}
      projectTypeOptions={projectTypeOptions}
      selectedProjectTypeName={selectedProjectTypeName}
      setSelectedProjectTypeInput={setSelectedProjectTypeInput}
      classificationOptions={classificationOptions}
      classificationId={classificationId}
      setClassificationId={setClassificationId}
      asbestosStatusOptions={asbestosStatusOptions}
      asbestosStatusInput={asbestosStatusInput}
      setAsbestosStatusInput={setAsbestosStatusInput}
      yearBuiltInput={yearBuiltInput}
      onChangeYearBuilt={onChangeYearBuilt}
      buildingNameInput={buildingNameInput}
      onChangeBuildingName={onChangeBuildingName}
      onEditButtonClick={onEditButtonClick}
      onSaveButtonClick={onSaveButtonClick}
    />
  );
};
PropertyDataEditContainer.defaultProps = {
  invalid: undefined,
  asbestosStatusId: null,
};
const PropertyDataEditContainerMemo = memo(PropertyDataEditContainer, areEqual);

export { PropertyDataEditContainerMemo as PropertyDataEdit };
