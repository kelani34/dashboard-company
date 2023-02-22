import React, { memo } from 'react';

import { Button } from 'Components/Button';
import { CreateCustomLevel, EditCustomLevel } from 'Containers/RocketScan';
import { areEqual } from 'Utils/equalityChecks';

import classes from './levelSelector.module.css';

type LevelType = {
  id: number;
  name: string;
};

interface Props {
  levelTypes: Array<LevelType>;
  selectedLevel: string;
  accordionCollapse: string;
  openMenu: string;
  accordionId: string;
  levelMenuHeading: string;
  levelOptions: string;
  roomType: string;
  onChange: (e: any) => void;
  onClick: (e: any) => void;
}

const LevelSelector = ({
  levelTypes,
  selectedLevel,
  accordionCollapse,
  openMenu,
  accordionId,
  levelMenuHeading,
  levelOptions,
  roomType,
  onChange,
  onClick,
}: Props) => (
  <div className={`accordion ${classes.selectorWrapper}`} id={accordionId}>
    <div className="accordion-item">
      <h2 className="accordion-header " id={levelMenuHeading}>
        <Button
          className={`accordion-button collapsed ${classes.currentLevel} ${
            openMenu.length === 0 ? '' : classes.closed
          }`}
          type="button"
          data-bs-target={`#${levelOptions}`}
          aria-expanded="false"
          aria-controls={levelOptions}
          onClick={onClick}
        >
          {selectedLevel}
        </Button>
      </h2>

      <div
        id={levelOptions}
        className={`accordion-collapse collapse ${accordionCollapse}`}
        aria-labelledby={levelOptions}
        data-bs-parent={accordionId}
      >
        <div className={`accordion-body ${classes.menuBody} ${accordionCollapse}`}>
          {levelTypes.length > 0 &&
            levelTypes.map(
              ({ id: levelId, name, is_standard: isStandard, rooms_count: roomsCount }: any) =>
                name !== selectedLevel &&
                (isStandard ? (
                  <Button
                    className={classes.levelOption}
                    id={levelId.toString()}
                    key={`${accordionId}-${levelId}`}
                    onClick={onChange}
                  >
                    {name}
                  </Button>
                ) : (
                  <EditCustomLevel
                    key={`${accordionId}-${levelId}`}
                    className={classes.customLevelOption}
                    id={levelId}
                    levelName={name}
                    canDelete={roomsCount === 0}
                    onClick={onChange}
                  />
                ))
            )}

          <div className={`${classes.levelOption}`}>
            <CreateCustomLevel roomType={roomType} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const LevelSelectorMemo = memo(LevelSelector, areEqual);
export { LevelSelectorMemo as LevelSelector };
