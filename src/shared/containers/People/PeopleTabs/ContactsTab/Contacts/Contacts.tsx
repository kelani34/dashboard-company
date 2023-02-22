import React, { memo, useEffect } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ContactCard } from 'Containers/People/PeopleTabs/ContactsTab';
import { LetterHeader } from 'Components/People/PeopleTabs/LetterHeader/LetterHeader';
import { useDispatch, useSelector } from 'react-redux';
import { recentlyAddedSelector } from 'Containers/People/PeopleTabs/ContactsTab/selectors';
import { setRecentlyAdded } from 'Containers/People/PeopleTabs/ContactsTab/actions';

interface Props {
  contactsInitials: any;
  onClickContactCard: (e: any) => void;
}

const ContactsContainer = ({ contactsInitials, onClickContactCard }: Props) => {
  const dispatch = useDispatch();
  const recentlyAdded = useSelector(recentlyAddedSelector, areEqual);

  // clear the highlighted contact card
  useEffect(() => {
    if (recentlyAdded) {
      setTimeout(() => {
        dispatch(setRecentlyAdded(undefined));
      }, 2000);
    }
  }, [recentlyAdded]);

  return (
    contactsInitials.length > 0 &&
    contactsInitials.map(({ initial, contacts }: any) => (
      <LetterHeader key={initial} name={initial}>
        {contacts.length > 0 &&
          contacts.map((contact: any) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              recentlyAdded={recentlyAdded}
              onClickContactCard={onClickContactCard}
            />
          ))}
      </LetterHeader>
    ))
  );
};

const ContactsContainerMemo = memo(ContactsContainer, areEqual);

export { ContactsContainerMemo as Contacts };
