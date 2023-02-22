import React, { memo, ReactNode, useState } from 'react';

import { areEqual } from 'Utils/equalityChecks';
import { width } from 'Utils/screen';
import { Icon } from 'Components/Icons';
import { OutlineButton } from 'Components/Button';

import { Tab } from '../Tab';

import classes from './formTabMenu.module.css';

interface Props {
  id?: string;
  className?: string;
  children?: ReactNode;
  modalCloseClick: () => void;
}

const createTabs = (activeTab: string, onTabClick: (e: any) => void) => (
  <>
    <Tab
      key="my-form-tab"
      id="my-form-tab"
      className={`${classes.flexCenter} ${classes.button} ${
        activeTab === 'my-form-tab' ? `active ${classes['active-Tab']}` : ''
      }`}
      target="my-form"
      onClick={onTabClick}
    >
      <>
        <Icon type="forms" className={classes.icon} fill="#ffff" />
        <span>Contract Form</span>
      </>
    </Tab>
  </>
);

const ContractFormsTabMenu = ({ id = 'tabs', className, children, modalCloseClick }: Props) => {
  // We want to set the initial active tab to the first tab in the incoming tabList
  const [activeTab, setActiveTab] = useState('my-form-tab');

  const onTabClick = (e: any) => {
    // Occasionally, e.currentTarget is undefined.  Set the current activeTab if we run into this bug

    setActiveTab(e?.currentTarget?.id || activeTab);
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col">
          <div className={classes.projectsTabWrapper}>
            <div className={classes.tabsContainer}>
              <ul
                className={`nav nav-tabs pr-4 ${width < 576 ? 'flex-sm-column' : 'width'}   ${classes.tabs} ${
                  className || ''
                }`}
                id={id}
                role="tablist"
              >
                {createTabs(activeTab, onTabClick)}
              </ul>
            </div>
            <div className={`${classes.tileFlexCenter}`}>
              <p className={classes.title}>Form Templates</p>
              <OutlineButton onClick={modalCloseClick} className={classes.roundButton}>
                <span>Add</span>
                <Icon type="plus" fill="#9a00ff" />
              </OutlineButton>
            </div>
            <div className="tab-content w-100 h-100 d-inline-block" id="myTabContent" style={{ height: 'auto' }}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

ContractFormsTabMenu.defaultProps = {
  id: undefined,
  className: undefined,
  children: undefined,
};

const FormsTabMenuMemo = memo(ContractFormsTabMenu, areEqual);
export { FormsTabMenuMemo as ContractFormsTabMenu };
