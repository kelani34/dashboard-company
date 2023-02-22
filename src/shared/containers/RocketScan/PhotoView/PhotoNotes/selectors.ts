export const photoNotesSelector = ({ photoNotes: { photoNotes: value = [] } }: any) => value;
export const fetchingPhotoNoteSelector = ({ photoNotes: { fetchingPhotoNotes: value = false } }: any) => value;
export const photoNoteCreatedSelector = ({ photoNotes: { photoNoteCreated: value = false } }: any) => value;

// error selectors
export const bodyErrorSelector = ({ photoNotes: { formErrors } }: any) => formErrors?.body || [];
