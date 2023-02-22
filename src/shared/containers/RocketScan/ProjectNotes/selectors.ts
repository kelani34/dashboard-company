// project notes
export const projectNotesSelector = ({ projectNotes: { projectNotes: value = [] } }: any) => value;
export const fetchingProjectNotesSelector = ({ projectNotes: { fetchingProjectNotes: value = false } }: any) => value;
export const projectNoteCreatedSelector = ({ projectNotes: { projectNoteCreated: value = false } }: any) => value;
export const projectTotalNotesSelector = ({ projectNotes: { totalNotes: value = 0 } }: any) => value;
export const projectTotalAllNotesSelector = ({ projectNotes: { totalAllNotes: value = 0 } }: any) => value;
export const projectCurrentPageNotesSelector = ({ projectNotes: { currentPage: value = 0 } }: any) => value;

// error selectors
export const bodyErrorSelector = ({ projectNotes: { formErrors } }: any) => formErrors?.body || [];
