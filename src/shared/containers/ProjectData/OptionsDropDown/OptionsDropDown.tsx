import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { OptionsDropDown } from 'Components/ProjectData';
import { MiniOptionsDropdown, dropdownSizes } from 'Components/DropDown';

interface Props {
  className: string;
  label?: string;
  placeHolder: string;
  items: any[];
  optionSelectedName?: string;
  optionSelectedId?: number;
  invalid?: boolean;
  size?: string;
  setStatusSelected?: (e: any) => void;
}

const OptionsDropDownContainer = ({
  className,
  label,
  placeHolder,
  items,
  optionSelectedName,
  optionSelectedId,
  invalid,
  size,
  setStatusSelected,
}: Props) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedOptionId, setSelectedOptionId] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);

  // if using a string/name
  useEffect(() => {
    if (optionSelectedName !== null) {
      setSelectedValue(optionSelectedName);
    }
  }, [optionSelectedName]);

  // if using a number/id as reference, this compares id to list and responds with id and name
  // id may be required for updating references in api call
  useEffect(() => {
    if (optionSelectedId !== null) {
      if (items?.length > 0) {
        const selectionNameValue = items.find((item: any) => item.id === optionSelectedId);

        if (selectionNameValue?.id) {
          setSelectedValue(selectionNameValue.name);
          setStatusSelected(selectionNameValue.id);
        } else {
          setSelectedValue('');
          setStatusSelected(0);
        }
      }
    }
  }, [optionSelectedId]);

  const onSelectItem = useCallback(
    (id: number) => {
      setSelectedOptionId(id);

      if (items.length > 0) {
        const item = items.find((item: any) => item.id === id);

        setSelectedValue(item.name);
        setStatusSelected(item.id);
      }

      setShowDropDown(false);
    },
    [items]
  );

  const onClickIcon = useCallback((e: any) => {
    e.preventDefault();
    setShowDropDown((prevState) => !prevState);
  }, []);

  switch (size) {
    case dropdownSizes.small:
      return (
        <MiniOptionsDropdown
          className={className}
          placeHolder={placeHolder}
          optionSelected={selectedValue}
          invalid={invalid}
          items={items}
          selectedOptionId={selectedOptionId}
          showDropdown={showDropDown}
          onSelectItem={onSelectItem}
          onClickIcon={onClickIcon}
        />
      );
    default:
      return (
        <OptionsDropDown
          className={className}
          label={label}
          placeHolder={placeHolder}
          optionSelected={selectedValue}
          invalid={invalid}
          items={items}
          selectedOptionId={selectedOptionId}
          showDropDown={showDropDown}
          onSelectItem={onSelectItem}
          onClickIcon={onClickIcon}
        />
      );
  }
};

OptionsDropDownContainer.defaultProps = {
  invalid: false,
  label: undefined,
  optionSelectedName: '',
  optionSelectedId: undefined,
  setStatusSelected: undefined,
  size: dropdownSizes.default,
};

const OptionsDropDownContainerMemo = memo(OptionsDropDownContainer, areEqual);

export { OptionsDropDownContainerMemo as OptionsDropDown };
