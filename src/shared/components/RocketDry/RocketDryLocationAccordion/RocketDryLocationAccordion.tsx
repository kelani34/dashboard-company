import React, { memo, ReactNode } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';
import { Icon } from 'Components/Icons';
import classes from './rocketDryLocationAccordion.module.css';

interface Props {
  children: ReactNode;
  id: number;
  icon?: string;
  type: string;
  title: string;
  isOpen: boolean;
  onToggleClick?: (e: any) => void;
}

const RocketDryLocationAccordion = ({ children, id, icon, type, title, isOpen, onToggleClick }: Props) => (
  <div className={`${classes.rocketDryLocationAccordion}`}>
    <div className="accordion accordion-flush" id={`accordion-${type}-${id}`}>
      <div className={`accordion-item ${classes.itemWrapper} ${isOpen ? classes.itemWrapperOpened : ''}`}>
        <div
          className={`accordion-header d-flex justify-content-between align-items-center ${classes.accordionHeader} ${
            isOpen ? `${classes.headerOpen}` : ''
          }`}
          id={`${type}-${id}-heading`}
        >
          <div className={`d-flex justify-content-start align-items-center ${classes.titleArea}`}>
            <Icon type={icon} />
            <div className={classes.title}>{title}</div>
          </div>

          <Button
            className={`accordion-button collapsed  ${isOpen ? `${classes.openState}` : ''} ${classes.buttonOverride}`}
            type="button"
            data-bs-target={`#rocketDryWrapperBody-${type}-${id}`}
            aria-expanded="true"
            aria-controls={`rocketDryWrapperBody-${type}-${id}`}
            onClick={onToggleClick}
          />
        </div>
        <div
          id={`rocketDryWrapperBody-${type}-${id}`}
          className={`accordion-collapse collapse ${isOpen ? 'show' : ''}`}
          aria-labelledby={`${type}-${id}-heading`}
          data-bs-parent={`accordion-${type}-${id}`}
        >
          <div className={`accordion-body ${classes.bodyOverride}`}>{children}</div>
        </div>
      </div>
    </div>
  </div>
);

RocketDryLocationAccordion.defaultProps = {
  icon: undefined,
  onToggleClick: undefined,
};
const RocketDryLocationAccordionMemo = memo(RocketDryLocationAccordion, areEqual);

export { RocketDryLocationAccordionMemo as RocketDryLocationAccordion };
