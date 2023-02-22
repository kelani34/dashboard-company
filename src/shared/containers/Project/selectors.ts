export const projectIdSelector = ({ projects: { selectedProjectId: value } }: any) => value;
export const propertySingleSelector = ({ project: { propertySingle: value } }: any) => value;
export const propertyMultiSelector = ({ project: { property: value } }: any) => value;
export const selectedPropertyTypeSelector = ({ project: { propertyType: value } }: any) => value;
export const fetchingPropertiesSelector = ({ project: { fetchingProperties: value } }: any) => value;
export const fetchingUnitsWithRoomsSelector = ({ project: { fetchingUnitsWithRooms: value } }: any) => value;
export const projectDeletedSelector = ({ project: { projectDeleted: value } }: any) => value;
export const projectMultiSelector = ({
  projects: {
    selectedProjectId,
    myProjects: { data: projectStore },
  },
}) => ({
  selectedProjectId,
  projectStore,
});
