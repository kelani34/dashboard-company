import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import classes from './noteItem.module.css';

interface Props {
  id: number;
  content: string;
}

const NoteItem = ({ id, content }: Props) => (
  <li className={`${classes.NoteItem}`} key={id}>
    {content}
  </li>
);

const NoteItemMemo = memo(NoteItem, areEqual);

export { NoteItemMemo as NoteItem };
