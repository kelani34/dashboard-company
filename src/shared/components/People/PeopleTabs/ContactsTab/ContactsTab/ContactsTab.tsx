import React, { memo } from 'react';

import { Spinner } from 'Components/Spinner';
import { PurpleButton } from 'Components/Button/PurpleButton';

import { areEqual } from 'Utils/equalityChecks';

import { InvitePlaceholder } from 'Components/People/PeopleTabs';
import { Contacts } from 'Containers/People/PeopleTabs/ContactsTab';
import classes from './contactsTab.module.css';

interface Props {
  contactsInitials: any[];
  totalContacts: number;
  fetching: boolean;
  onClickContactCard: (e: any) => void;
  onClickPlaceholderButton: (e: any) => void;
}

const ContactsTab = ({
  contactsInitials,
  totalContacts,
  fetching,
  onClickContactCard,
  onClickPlaceholderButton,
}: Props) => (
  <div className={classes.contactsContent}>
    <div className={`d-flex justify-content-start align-items-center ${classes.contentHeader}`}>
      <h2>Contacts</h2>
      <PurpleButton className={classes.addButton} onClick={onClickPlaceholderButton}>
        Add +
      </PurpleButton>
    </div>
    {fetching && <Spinner loading />}
    {totalContacts === 0 && !fetching && (
      <InvitePlaceholder tab="contacts" onClickPlaceholderButton={onClickPlaceholderButton} />
    )}
    <Contacts contactsInitials={contactsInitials} onClickContactCard={onClickContactCard} />
  </div>
);

const ContactsTabMemo = memo(ContactsTab, areEqual);

export { ContactsTabMemo as ContactsTab };
