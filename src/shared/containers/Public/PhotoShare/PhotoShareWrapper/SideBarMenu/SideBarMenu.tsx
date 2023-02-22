import React, { memo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { areEqual } from 'Utils/equalityChecks';
import { UnitsMenu } from 'Components/Selectors/UnitsMenu';

import {
  fetchingItemsSelector,
  menuItemsSelector,
} from 'Containers/Public/PhotoShare/PhotoShareWrapper/SideBarMenu/selector';
import { Spinner } from 'Components/Spinner';
import { listMenuItems } from './actions';

export const SideBarMenuContainer = () => {
  const dispatch = useDispatch();
  const fetching = useSelector(fetchingItemsSelector, areEqual);

  const accordionId = 'item-rooms-accordion';
  const itemMenuHeading = 'itemHeading';
  const itemSubOptions = 'item-rooms';

  const items = useSelector(menuItemsSelector, areEqual);

  const { uuid } = useParams<{ uuid: string }>();

  useEffect(() => {
    dispatch(listMenuItems(uuid));
  }, [uuid]);

  return (
    <>
      {fetching && (
        <div className="d-flex w-100 position-relative pt-xl-5">
          <Spinner loading />
        </div>
      )}

      {!fetching && items.length > 0 && (
        <UnitsMenu
          unitTypes={items}
          accordionId={accordionId}
          itemMenuHeading={itemMenuHeading}
          itemSubOptions={itemSubOptions}
        />
      )}
    </>
  );
};

const SideBarMenuContainerMemo = memo(SideBarMenuContainer, areEqual);

export { SideBarMenuContainerMemo as SideBarMenu };
