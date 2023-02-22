import React, { memo } from 'react';

import { Header } from 'Components/PhotoShare/Header';
import { SideBarFixed } from 'Containers/Public/PhotoShare/PhotoShareWrapper/SideBarFixed';
import { Location } from 'Containers/Public/Location';

import { areEqual } from 'Utils/equalityChecks';
import classes from './photoShare.module.css';

interface Props {
  projectUid: string;
  logo: string;
  location?: string;
  date?: string;
  items: any[];
}

const PhotoShare = ({ projectUid, logo, location, date, items }: Props) => (
  <div className="container-fluid d-flex justify-start p-0">
    <SideBarFixed />

    <div className={`col ${classes.bodyColumn}`}>
      <Header id={projectUid} logo={logo} location={location} date={date} />

      <div className={`col ${classes.content}`}>
        <div className="d-flex flex-column w-100 px-3 px-md-0">
          <div className="list-group">
            {items.length > 0 ? (
              items.map((item) => <Location key={item.id} locationId={item.id} locationName={item.name} />)
            ) : (
              <div>There are no photos shared from this project.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);

PhotoShare.defaultProps = {
  location: undefined,
  date: undefined,
};

const PhotoShareMemo = memo(PhotoShare, areEqual);

export { PhotoShareMemo as PhotoShare };
