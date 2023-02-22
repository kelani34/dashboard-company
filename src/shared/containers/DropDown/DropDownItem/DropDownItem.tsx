import React, { memo, useCallback, useEffect, useRef } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { DropDownItem } from 'Components/DropDown/DropDownItem';
import { MiniDropdownItem } from 'Components/DropDown/MiniDropdownItem';
import { dropdownSizes } from 'Components/DropDown';

interface Props {
  id: number;
  name: string;
  selected: number;
  showDropDown: boolean;
  size?: string;
  shouldScroll?: boolean;
  onSelectItem: (e: any) => void;
}

const DropDownItemContainer = ({ id, name, selected, onSelectItem, showDropDown, size, shouldScroll }: Props) => {
  const ref = useRef(null);

  const onClick = useCallback((e: any) => {
    e.preventDefault();

    if (onSelectItem) onSelectItem(id);
  }, []);

  // pre select 0 on floor numbers
  // TODO::To be refactor into a separate container
  const scrollToItem = useCallback(() => {
    if (typeof selected !== 'undefined') {
      if (selected === id && showDropDown) {
        ref.current.scrollIntoView();
      }
    }
  }, [showDropDown]);

  useEffect(() => {
    if (shouldScroll) {
      scrollToItem();
    }
  }, [showDropDown, shouldScroll]);

  switch (size) {
    case dropdownSizes.small:
      return <MiniDropdownItem ref={ref} id={id} name={name} selected={selected} onSelectItem={onClick} />;
    default:
      return <DropDownItem ref={ref} id={id} name={name} selected={selected} onSelectItem={onClick} />;
  }
};

DropDownItemContainer.defaultProps = {
  size: 'default',
  shouldScroll: false,
};

const DropDownItemContainerMemo = memo(DropDownItemContainer, areEqual);

export { DropDownItemContainerMemo as DropDownItem };
