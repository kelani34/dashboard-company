export const locationNotesSelector = ({ locationNotes: { locationNotes: value = [] } }: any) => value;
export const fetchingLocationNotesSelector = ({ locationNotes: { fetchingLocationNotes: value = false } }: any) =>
  value;
export const locationNoteCreatedSelector = ({ locationNotes: { locationNoteCreated: value = false } }: any) => value;
export const localNotesCountSelector = ({ locationNotes: { localNotesCount: value = 0 } }: any) => value;
export const totalNotesCountSelector = ({ locationNotes: { totalNotesCount: value = 0 } }: any) => value;
export const currentPageSelector = ({ locationNotes: { currentPage: value = 1 } }: any) => value;

// error selectors
export const bodyErrorSelector = ({ locationNotes: { locationNoteCreateErrors } }: any) =>
  locationNoteCreateErrors?.body || [];
