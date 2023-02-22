import React, { memo, useCallback, useEffect, useState } from 'react';

import { LevelSelector } from 'Components/Selectors/LevelSelector/LevelSelector';
import { areEqual } from 'Utils/equalityChecks';
import { useSelector } from 'react-redux';

import { levelTypesSelector, exteriorLevelsSelector } from 'Containers/RocketScan/selectors';

interface Props {
  defaultSelectedItem: string;
  defaultAccordionCollapse: boolean;
  accordionId: string;
  levelMenuHeading: string;
  levelOptions: string;
  roomType?: string;
  onLevelChange?: (e: MouseEvent) => void;
}

const LevelSelectorContainer = ({
  defaultSelectedItem,
  defaultAccordionCollapse,
  accordionId,
  levelMenuHeading,
  levelOptions,
  roomType,
  onLevelChange,
}: Props) => {
  // variables
  const [selectedItem, setSelectedItem] = useState(defaultSelectedItem);
  const [rotateArrow, setRotateArrow] = useState('closed');

  // selectors
  const interiorLevelTypes = useSelector(levelTypesSelector, areEqual);
  const exteriorLevelTypes = useSelector(exteriorLevelsSelector, areEqual);

  // THIS IS AN EXAMPLE OF HOW TO USE WITHIN A CONTAINER
  const [accordionCollapse, setAccordionCollapse] = useState(defaultAccordionCollapse ? '' : 'show');

  useEffect(() => {
    if (defaultSelectedItem !== selectedItem) {
      setSelectedItem(defaultSelectedItem);
    }
    setAccordionCollapse(defaultAccordionCollapse ? '' : 'show');
  }, [defaultSelectedItem, defaultAccordionCollapse]);

  useEffect(() => {
    if (defaultSelectedItem !== selectedItem) {
      setSelectedItem(defaultSelectedItem);
    }
    setAccordionCollapse(defaultAccordionCollapse ? '' : 'show');
  }, [defaultSelectedItem, defaultAccordionCollapse]);

  const onClick = useCallback(
    (e: any) => {
      e.preventDefault();
      setAccordionCollapse(accordionCollapse.length === 0 ? 'show' : '');
      setRotateArrow(rotateArrow.length === 0 ? 'closed' : '');
    },
    [accordionCollapse, rotateArrow]
  );

  const selectOnChange = useCallback((e: any) => {
    e.preventDefault();

    // Do we need the numeric value for a level.  If so, it's the id on the target
    const { innerText: levelTitle } = e.target;
    setSelectedItem(levelTitle);
    setAccordionCollapse('');
    setRotateArrow('closed');

    // Run the method the parent sends that handles selection
    if (onLevelChange) onLevelChange(e);
  }, []);

  return (
    <LevelSelector
      onChange={selectOnChange}
      onClick={onClick}
      levelTypes={roomType.includes('external') ? exteriorLevelTypes : interiorLevelTypes}
      selectedLevel={selectedItem}
      accordionCollapse={accordionCollapse}
      openMenu={rotateArrow}
      accordionId={accordionId}
      levelMenuHeading={levelMenuHeading}
      levelOptions={levelOptions}
      roomType={roomType}
    />
  );
};

LevelSelectorContainer.defaultProps = {
  onLevelChange: undefined,
  roomType: '',
};

const LevelSelectorContainerMemo = memo(LevelSelectorContainer, areEqual);

export { LevelSelectorContainerMemo as LevelSelector };
