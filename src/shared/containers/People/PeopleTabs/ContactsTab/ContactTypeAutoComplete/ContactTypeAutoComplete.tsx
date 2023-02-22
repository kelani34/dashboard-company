import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ContactTypeAutoComplete } from 'Components/People/PeopleTabs/ContactsTab';
import { listContactTypes } from 'Containers/People/PeopleTabs/ContactsTab/actions';
import { useDispatch, useSelector } from 'react-redux';
import { contactTypesSelector } from 'Containers/People/PeopleTabs/ContactsTab/selectors';

interface Props {
  contactType: number;
  invalid?: boolean;
  setSelectedContactType?: (e: any) => void;
}

const ContactTypeAutoCompleteContainer = ({ contactType, invalid, setSelectedContactType }: Props) => {
  const dispatch = useDispatch();

  const [selectedValue, setSelectedValue]: any = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [contactTypes, setContactTypes] = useState([]);

  const contactTypesList = useSelector(contactTypesSelector, areEqual);

  useEffect(() => {
    if (contactTypesList.length === 0) {
      dispatch(listContactTypes());
    }
  }, []);

  useEffect(() => {
    if (contactTypesList.length > 0 && contactType) {
      const givenContactType = contactTypesList.find((_contactType: any) => _contactType.id === contactType);

      if (givenContactType) {
        setSelectedValue(givenContactType.name);
      }
    }
  }, [contactType, contactTypesList]);

  useEffect(() => {
    if (contactTypesList.length > 0) {
      setContactTypes(contactTypesList);
    }
  }, [contactTypesList]);

  const onChangeContactType = useCallback(
    (e: any) => {
      const { value } = e.target;

      if (value.length > 0 && contactTypesList.length > 0) {
        setShowDropDown(true);
        const lowercase = value.toLocaleLowerCase();

        setContactTypes((types: any) => types.filter((type: any) => type.name.toLocaleLowerCase().includes(lowercase)));
      } else {
        setContactTypes(contactTypesList);
      }
      setSelectedValue(value);
    },
    [contactTypes]
  );

  const onSelectItem = useCallback(
    (id: number) => {
      setSelectedContactType(id);

      if (contactTypes.length > 0) {
        const contactType = contactTypes.find((contactType: any) => contactType.id === id);

        setSelectedValue(contactType.name);
      }

      setShowDropDown(false);
    },
    [contactTypes]
  );

  const onClickIcon = useCallback(() => {
    setShowDropDown((prevState) => !prevState);
  }, []);

  return (
    <ContactTypeAutoComplete
      contactType={selectedValue}
      selectedContactType={contactType}
      contactTypes={contactTypes}
      showDropDown={showDropDown}
      invalid={invalid}
      onChangeContactType={onChangeContactType}
      onSelectItem={onSelectItem}
      onClickIcon={onClickIcon}
    />
  );
};

ContactTypeAutoCompleteContainer.defaultProps = {
  invalid: false,
  setSelectedContactType: undefined,
};

const ContactTypeAutoCompleteContainerMemo = memo(ContactTypeAutoCompleteContainer, areEqual);

export { ContactTypeAutoCompleteContainerMemo as ContactTypeAutoComplete };
