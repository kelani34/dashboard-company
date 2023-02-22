import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { TextBox } from 'Components/TextBox';
import { DropDown } from 'Components/DropDown';

import formClasses from 'Themes/form/form.module.css';
import { Icon } from 'Components/Icons';
import classes from './contactTypeAutoComplete.module.css';

interface Props {
  className?: string;
  contactType: string;
  selectedContactType: number;
  contactTypes: Array<any>;
  invalid?: boolean;
  showDropDown: boolean;
  onChangeContactType: (e: any) => void;
  onSelectItem: (e: any) => void;
  onClickIcon: (e: any) => void;
}

const ContactTypeAutoComplete = ({
  className,
  contactType,
  selectedContactType,
  contactTypes,
  onSelectItem,
  invalid,
  showDropDown,
  onChangeContactType,
  onClickIcon,
}: Props) => (
  <div className={`dropdown ${className || ''} ${classes.contactTypeBase}`}>
    <TextBox
      name="contactType"
      type="text"
      ariaLabel="Select a Contact Type"
      className={`${formClasses.validateField} ${invalid ? formClasses.invalidField : formClasses.validField}`}
      value={contactType}
      onChange={onChangeContactType}
      autoComplete="off"
      placeholder="Select a Contact Type"
    />
    <Icon className={classes.icon} type={showDropDown ? 'caretup' : 'caretdown'} onClick={onClickIcon} />
    {contactTypes && (
      <DropDown
        id="contactTypesDropDown"
        items={contactTypes}
        selected={selectedContactType}
        onSelectItem={onSelectItem}
        showDropDown={showDropDown}
      />
    )}
  </div>
);

ContactTypeAutoComplete.defaultProps = {
  className: undefined,
  invalid: false,
};

const ContactTypeAutoCompleteMemo = memo(ContactTypeAutoComplete, areEqual);

export { ContactTypeAutoCompleteMemo as ContactTypeAutoComplete };
