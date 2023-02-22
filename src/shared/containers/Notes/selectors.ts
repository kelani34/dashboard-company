// photo notes
export const photoNoteEditedSelector = ({ notes: { photoNoteEdited: value = false } }: any) => value;

// photo note errors
export const photoNoteBodyErrorSelector = ({ notes: { photoNoteEditErrors } }: any) => photoNoteEditErrors?.body || [];

// project notes
export const projectNotesSelector = ({ notes: { projectNotes: value = [] } }: any) => value;
export const projectNotesCurrentPageSelector = ({ notes: { projectNotesCurrentPage: value = 1 } }: any) => value;
export const projectNotesTotalSelector = ({ notes: { projectNotesTotal: value = 0 } }: any) => value;
export const fetchingProjectNotesAllSelector = ({ notes: { fetchingProjectNotes: value = false } }: any) => value;

// all notes filter
export const allNotesFilterBookmarkedSelector = ({ notes: { filterBookmarked: value = false } }: any) => value;
export const allNotesFilterFlaggedSelector = ({ notes: { filterFlagged: value = false } }: any) => value;
