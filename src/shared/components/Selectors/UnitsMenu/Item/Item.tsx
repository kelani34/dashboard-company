import React, { memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';
import { Spinner } from 'Components/Spinner';
import { LocationRoomsMenu } from 'Containers/Public/PhotoShare';

import classes from './item.module.css';

interface Props {
  item: any;
  subItems: any;
  fetching: boolean;
  itemButtonSelected: number;
  accordionId: string;
  itemMenuHeading: string;
  itemSubOptions: string;
  isNavItemCollapsed: boolean;
  onClick: (e: any) => void;
  onClickSubItem: (e: any) => void;
}

const Item = ({
  item,
  subItems,
  fetching,
  itemButtonSelected,
  accordionId,
  itemMenuHeading,
  itemSubOptions,
  isNavItemCollapsed,
  onClick,
  onClickSubItem,
}: Props) => (
  <div key={`${item.id}-${accordionId}`} className={`accordion-item ${classes.itemWrapper}`}>
    <h2
      className={`accordion-header ${classes.header} ${
        itemButtonSelected === item.id && !isNavItemCollapsed ? '' : classes.closed
      }`}
      id={`${itemMenuHeading}-${item.id}`}
    >
      <Button
        id={item.id}
        className={`accordion-button collapsed ${classes.currentItem}`}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target={`#${itemSubOptions}-${item.id}`}
        aria-expanded={!isNavItemCollapsed}
        aria-controls={`${itemSubOptions}-${item.id}`}
        onClick={onClick}
      >
        <Icon type={item.location_type.id === 1 ? 'unit' : 'floor'} />
        {item.name}
      </Button>
    </h2>

    <div
      id={`${itemSubOptions}-${item.id}`}
      className={`accordion-collapse collapse ${itemButtonSelected === item.id && !isNavItemCollapsed ? 'show' : ''}`}
      aria-labelledby={`${itemMenuHeading}-${item.id}`}
      data-bs-parent={accordionId}
    >
      <div className={`accordion-body ${classes.menuBody}`}>
        {fetching && (
          <div className="d-flex w-100 position-relative pt-xl-5">
            <Spinner loading />
          </div>
        )}
        {!fetching && (
          <LocationRoomsMenu
            subItems={subItems}
            classNameMenu={classes.itemSubOption}
            classNameMessage={classes.noRoomsAlertText}
            item={item}
            onRoomClick={onClickSubItem}
          />
        )}
      </div>
    </div>
  </div>
);

const ItemMemo = memo(Item, areEqual);

export { ItemMemo as Item };
