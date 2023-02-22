import React, { memo, useCallback, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { ScopeOfWorkDropdown } from 'Components/RocketScan/RoomsView';

import { floorNumbers } from 'Utils/helpers';

interface Props {
  dropdownType: string;
  floorNumber: number;
  invalid?: boolean;
  hideDropDown: boolean;
  setFloorNumber?: (e: any) => void;
}

const ScopeOfWorkDropdownContainer = ({ dropdownType, floorNumber, invalid, hideDropDown, setFloorNumber }: Props) => {
  const [selectedValue, setSelectedValue]: any = useState('0');
  const [numbers, setNumbers] = useState(floorNumbers());
  const [showDropDown, setShowDropDown] = useState(false);

  const floorList = floorNumbers();

  useEffect(() => {
    if (floorNumber.toString() !== '0') {
      setNumbers([]);
      setSelectedValue(floorNumber);
      setNumbers(floorNumbers());
    }
  }, [floorNumber]);

  useEffect(() => {
    if (hideDropDown) {
      setShowDropDown(false);
    }
  }, [hideDropDown]);

  const onChangeFloorSelect = useCallback(
    (e: any) => {
      const { value } = e.target;

      if (value.length > 0 && floorList.length > 0) {
        setShowDropDown(true);
        setNumbers(floorNumbers().filter((floor: any) => floor.name.includes(value)));
      } else {
        setNumbers(floorList);
      }
      setSelectedValue(value);
    },
    [numbers]
  );

  const onSelectItem = useCallback(
    (id: number) => {
      setFloorNumber(id);
      if (numbers.length > 0) {
        const floor = numbers.find((floor: any) => floor.id === id);
        setSelectedValue(floor.name);
      }

      setShowDropDown(false);
    },
    [numbers]
  );

  const onClickIcon = useCallback(() => {
    setShowDropDown((prevState) => !prevState);
  }, []);

  return (
    <ScopeOfWorkDropdown
      dropdownType={dropdownType}
      selectedOption={selectedValue}
      selectedOptionId={floorNumber}
      choices={numbers}
      showDropDown={showDropDown}
      invalid={invalid}
      onChangeValueSelect={onChangeFloorSelect}
      onSelectItem={onSelectItem}
      onClickIcon={onClickIcon}
    />
  );
};

ScopeOfWorkDropdownContainer.defaultProps = {
  invalid: false,
  setFloorNumber: undefined,
};

const ScopeOfWorkDropdownContainerMemo = memo(ScopeOfWorkDropdownContainer, areEqual);

export { ScopeOfWorkDropdownContainerMemo as ScopeOfWorkDropdown };
