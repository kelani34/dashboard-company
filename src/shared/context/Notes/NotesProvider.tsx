import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { NotesFormContext, NotesFormFunctions } from 'Context/Notes';
import { DeleteNoteModal } from 'Components/Notes';
import { NotesSearchFunctions } from 'Context/Notes/NotesContext';

// notes form provider
const NotesProvider = ({ children }: any) => {
  const NotesForm = NotesFormFunctions();
  const NotesSearch = NotesSearchFunctions();

  const { noteId, isOpenDeleteNoteModal, closeDeleteNoteModalClick, onDeleteButtonClick } = NotesForm;

  return (
    <NotesFormContext.Provider value={{ ...NotesForm, ...NotesSearch }}>
      {children}
      <DeleteNoteModal
        id={noteId}
        isOpen={isOpenDeleteNoteModal}
        noteType="Photo"
        closeDeleteNoteModalClick={closeDeleteNoteModalClick}
        onDeleteButtonClick={onDeleteButtonClick}
      />
    </NotesFormContext.Provider>
  );
};

const NotesProviderMemo = memo(NotesProvider, areEqual);

export { NotesProviderMemo as NotesProvider };
