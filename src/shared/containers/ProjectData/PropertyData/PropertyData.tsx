import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { PropertyData } from 'Components/ProjectData';
import { usePropertyDataFunctions } from 'Context/PropertyData';
import { formatDate } from 'Utils/helpers';
import { listProjectTypes, getProject } from 'Containers/RocketScan/actions';

import {
  getPropertyData,
  setPropertyData,
  listAsbestosStatuses,
  setPropertyDataEdited,
} from 'Containers/ProjectData/PropertyData/actions';

const PropertyDataContainer = () => {
  const dispatch = useDispatch();

  // selectors from context
  const { project, property, propertyData, editIsOpen, propertyDataEdited, onEditButtonClick }: any =
    usePropertyDataFunctions();

  // local state
  const [dateCreated, setDateCreated] = useState('');
  const [projectId, setProjectId] = useState();
  const [projectUid, setProjectUid] = useState();
  const [propertyId, setPropertyId] = useState();

  const [projectTypeId, setProjecTypeId] = useState(0);
  const [projectTypeName, setProjectTypeName] = useState('');

  const [projectTypeNameSelected, setProjectTypeNameSelected] = useState('');
  const [isResidential, setIsResidential] = useState(null);
  const [isCommercial, setIsCommercial] = useState(null);
  const [buildingName, setBuildingName] = useState(null);
  const [yearBuilt, setYearBuilt] = useState(null);
  const [asbestosStatusName, setAsbestosStatusName] = useState('');
  const [asbestosStatusId, setAsbestosStatusId] = useState(null);
  const [classificationName, setClassificationName] = useState(null);

  // provide classification name based on isResidential & isCommercial states
  const getClassificationName = useCallback((isResidential: boolean, isCommercial: boolean) => {
    if (isResidential) {
      if (isCommercial) {
        return 'Both';
      }
      return 'Residential';
    }
    return isCommercial ? 'Commercial' : null;
  }, []);

  // intitial render for project info
  useEffect(() => {
    if (project?.id) {
      const { id, uid, createdAt } = project;
      const formattedDate = formatDate(createdAt, 'PP h:mmaaa O');

      setDateCreated(formattedDate);
      setProjectId(id);
      setProjectUid(uid);

      if (project?.projectType) {
        const {
          projectType: { id: typeId, name: typeName },
        } = project;

        setProjecTypeId(typeId);
        setProjectTypeName(typeName);
      }

      // loading options for drop downs on edit form
      dispatch(listProjectTypes());
      dispatch(listAsbestosStatuses());
    }
  }, [project]);

  // initial render property info
  useEffect(() => {
    if (property?.id) {
      const { id } = property;
      setPropertyId(id);
      dispatch(getPropertyData(id));
    } else {
      // unset property data if changing to a project without property
      dispatch(setPropertyData({}));
    }
  }, [property, propertyDataEdited, propertyData]);

  // for refresh
  useEffect(() => {
    if (property?.id || propertyData?.id) {
      // fetch current propertyData
      const { asbestosStatus, isResidential, isCommercial, buildingName, yearBuilt } = propertyData;

      // check if asbestosStatus is already null, then set local
      // this cleanses field from being populated with data from last property visited
      if (!asbestosStatus?.id || propertyData?.id !== propertyId) {
        setAsbestosStatusName(null);
        setAsbestosStatusId(null);
      }
      // fetch project with updated projectType
      if (projectId && propertyData?.id === propertyId) {
        setIsResidential(isResidential);
        setIsCommercial(isCommercial);
        setBuildingName(buildingName);
        setYearBuilt(yearBuilt);
      } else {
        // initial render from blank project will not carry projectId
        setIsResidential(null);
        setIsCommercial(null);
        setBuildingName(null);
        setYearBuilt(null);
      }
    }
  }, [propertyData, propertyDataEdited, projectId]);

  // fetch project to update projectType
  useEffect(() => {
    if (propertyDataEdited) {
      dispatch(getProject(projectId));
      setPropertyDataEdited(false);
    }
  }, [propertyDataEdited]);

  // Updating project type name change
  useEffect(() => {
    if (project?.id) {
      if (project?.projectType) {
        const {
          projectType: { id: typeId, name: typeName },
        } = project;

        if (typeName !== projectTypeNameSelected) {
          // set locals with new values if name is different
          setProjecTypeId(typeId);
          setProjectTypeName(typeName);
          setProjectTypeNameSelected(typeName);
        }
      } else {
        // reset locals if no project type
        setProjecTypeId(0);
        setProjectTypeName(null);
        setProjectTypeNameSelected(null);
      }
    }
  }, [propertyDataEdited, project, propertyData]);

  // Updating Asbestos Status:
  useEffect(() => {
    if (propertyData?.id) {
      // yes, we have propertyData set
      if (propertyData?.asbestosStatus) {
        // yes, there is an object for asbestosStatus
        const {
          asbestosStatus: { id: statusId, name: statusName },
        } = propertyData;

        if (statusName !== asbestosStatusName) {
          // set local states
          setAsbestosStatusId(statusId);
          setAsbestosStatusName(statusName);
        }
      }
    } else {
      // when there is no propertyData set yet
      setAsbestosStatusId(null);
      setAsbestosStatusName(null);
    }
  }, [propertyDataEdited, propertyData]);

  // sets name of property classification - Residential, Commercial, or Both
  useEffect(() => {
    if (property?.id) {
      setClassificationName(getClassificationName(isResidential, isCommercial));
    }
  }, [property, isResidential, isCommercial]);

  return (
    <PropertyData
      project={project}
      dateCreated={dateCreated}
      projectId={projectId} // Edit
      projectUid={projectUid}
      editIsOpen={editIsOpen}
      projectTypeId={projectTypeId} // Edit
      projectTypeName={projectTypeName} // Edit
      projectTypeNameSelected={projectTypeNameSelected} // View
      isResidential={isResidential} // Edit
      isCommercial={isCommercial} // Edit
      buildingName={buildingName} // Edit & View
      yearBuilt={yearBuilt} // Edit & View
      asbestosStatusId={asbestosStatusId} // Edit
      asbestosStatusName={asbestosStatusName} // View
      classificationName={classificationName} // View
      onEditButtonClick={onEditButtonClick}
    />
  );
};

const PropertyDataContainerMemo = memo(PropertyDataContainer, areEqual);

export { PropertyDataContainerMemo as PropertyData };
