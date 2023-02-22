import React, { memo, ReactNode } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { SingleProjectProvider } from 'Context/Project';
import { ProjectTabsLayout } from 'Containers/Layouts/ProjectTabsLayout';
import { TabContent } from 'Components/Tabs';

import classes from './notesWrapper.module.css';

interface Props {
  children: ReactNode;
}

const NotesWrapper = ({ children }: Props) => (
  <SingleProjectProvider tab="notes">
    <ProjectTabsLayout tab="notes">
      <TabContent id="notes" className={`active show position-relative ${classes.tabContent}`}>
        {children}
      </TabContent>
    </ProjectTabsLayout>
  </SingleProjectProvider>
);

const NotesWrapperMemo = memo(NotesWrapper, areEqual);

export { NotesWrapperMemo as NotesWrapper };
