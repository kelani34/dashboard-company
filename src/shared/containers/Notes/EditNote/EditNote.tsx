import React, { memo, useCallback, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { NoteEditForm } from 'Components/Notes';
import { useDispatch } from 'react-redux';
import { editNote, PHOTO_NOTE_EDITED } from 'Containers/Notes/actions';

interface Props {
  id: number;
  content: string;
  editable: boolean;
  setNoteEdited: (e: any) => void;
  setEditable: (e: any) => void;
}

const EditNoteContainer = ({ id, editable, content, setNoteEdited, setEditable }: Props) => {
  const dispatch = useDispatch();

  // local state
  const [note, setNote] = useState(content);
  const [fetching, setFetching] = useState(false);
  const [formErrors, setFormErrors] = useState({ body: [] });

  const onNoteChange = useCallback(({ target: { value } }: any) => {
    if (value.length <= 255) {
      setNote(value);
    }
  }, []);

  const onClickCancel = useCallback(() => {
    setEditable(false);
  }, []);

  // set errors on individual component
  const setErrorsCallback = useCallback((errors: any) => {
    if (errors?.body) {
      setFormErrors(errors);
    } else {
      setFormErrors({ body: [] });
    }
  }, []);

  const onFormSubmit = useCallback(
    (e: any) => {
      e.preventDefault();
      // TODO:: need to find a way to pass different EDIT_TYPES
      dispatch(editNote(id, { body: note }, PHOTO_NOTE_EDITED, setFetching, setNoteEdited, setErrorsCallback));
    },
    [note, fetching]
  );

  return (
    <NoteEditForm
      note={note}
      editable={editable}
      formErrors={formErrors}
      fetching={fetching}
      onNoteChange={onNoteChange}
      onFormSubmit={onFormSubmit}
      onClickCancel={onClickCancel}
    />
  );
};

const EditNoteContainerMemo = memo(EditNoteContainer, areEqual);

export { EditNoteContainerMemo as EditNoteContainer };
