export const activeProjectSelector = ({ dashboard: { activeProject: value = false } }: any) => value;

export const myProjectsSelector = ({ projects: { myProjects: value = {} } }: any) => value;

export const fetchingMyProjectsSelector = ({ projects: { fetchingMyProjects: value = false } }: any) => value;

export const mobileWarningModalShownSelector = ({ dashboard: { mobileWarningModalShown: value = false } }: any) =>
  value;
