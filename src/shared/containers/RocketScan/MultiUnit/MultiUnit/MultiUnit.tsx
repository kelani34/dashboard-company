import React, { memo, useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { areEqual } from 'Utils/equalityChecks';

import { MultiUnitBody } from 'Components/TabContentBody';
import { Spinner } from 'Components/Spinner';

import { Header, ProjectNotes, RocketScanWrapper } from 'Containers/RocketScan';

import { fetchingProjectSelector, projectAddressSelector } from 'Containers/RocketScan/selectors';
import { setRefreshLocations } from 'Containers/RocketScan/MultiUnit/Locations/actions';
import { clearRoomsObject } from 'Containers/RocketScan/RoomsView/Rooms/actions';

import { selectPhotosModeSelector } from 'Containers/RocketScan/Header/ActionsCenter/selectors';

interface Props {
  isCommercialProperty?: boolean;
  withoutWrapper?: boolean;
}

const MultiUnitContainer = ({ isCommercialProperty, withoutWrapper }: Props) => {
  const dispatch = useDispatch();

  const [localLocationCreated, setLocalLocationCreated] = useState(false);
  const [isUnitModalOpen, setIsUnitModalOpen] = useState(false);
  const [isFloorModalOpen, setIsFloorModalOpen] = useState(false);
  const [headerIcon, setHeaderIcon] = useState('singlehome');

  const projectAddress = useSelector(projectAddressSelector, areEqual);
  const fetching = useSelector(fetchingProjectSelector, areEqual);
  const isSelectingPhotoMode = useSelector(selectPhotosModeSelector, areEqual);

  // clear rooms data on rooms view when switching units
  useEffect(() => {
    dispatch(clearRoomsObject());
  }, []);

  useEffect(() => {
    setHeaderIcon(isCommercialProperty ? 'commercial' : 'singlehome');
  }, []);

  const setUnitModalStatus = useCallback(() => {
    setIsFloorModalOpen(false);
    setIsUnitModalOpen(true);
  }, []);

  const setFloorModalStatus = useCallback(() => {
    setIsUnitModalOpen(false);
    setIsFloorModalOpen(true);
  }, []);

  const onClickCloseLocationCreate = useCallback(() => {
    setIsUnitModalOpen(false);
    setIsFloorModalOpen(false);
  }, []);

  useEffect(() => {
    if (localLocationCreated) {
      onClickCloseLocationCreate();
    }
  }, [localLocationCreated]);

  useEffect(() => {
    if (localLocationCreated && !isUnitModalOpen && !isFloorModalOpen) {
      dispatch(setRefreshLocations(true));
      setLocalLocationCreated(false);
    }
  }, [localLocationCreated, isUnitModalOpen, isFloorModalOpen]);

  // we don't need to send the main wrapper when multiunit is being used as a child component
  return withoutWrapper ? (
    <>
      <Spinner loading={fetching} />

      {!fetching && !withoutWrapper && (
        <Header icon={headerIcon} name={projectAddress} propertyType="multiunit" locationType="locationsview" />
      )}
      <br />
      <ProjectNotes />
      {!fetching && (
        <MultiUnitBody
          isCommercialProperty={isCommercialProperty}
          isUnitModalOpen={isUnitModalOpen}
          setUnitModalStatus={setUnitModalStatus}
          isFloorModalOpen={isFloorModalOpen}
          setFloorModalStatus={setFloorModalStatus}
          closeModal={onClickCloseLocationCreate}
          localLocationCreated={localLocationCreated}
          isSelectingPhotoMode={isSelectingPhotoMode}
          setLocalLocationCreated={setLocalLocationCreated}
        />
      )}
    </>
  ) : (
    <RocketScanWrapper>
      <Spinner loading={fetching} />

      {!fetching && !withoutWrapper && (
        <Header icon={headerIcon} name={projectAddress} propertyType="multiunit" locationType="locationsview" />
      )}
      <br />
      <ProjectNotes />
      {!fetching && (
        <MultiUnitBody
          isCommercialProperty={isCommercialProperty}
          isUnitModalOpen={isUnitModalOpen}
          setUnitModalStatus={setUnitModalStatus}
          isFloorModalOpen={isFloorModalOpen}
          setFloorModalStatus={setFloorModalStatus}
          closeModal={onClickCloseLocationCreate}
          localLocationCreated={localLocationCreated}
          setLocalLocationCreated={setLocalLocationCreated}
        />
      )}
    </RocketScanWrapper>
  );
};

MultiUnitContainer.defaultProps = {
  isCommercialProperty: false,
  withoutWrapper: false,
};

const MultiUnitContainerMemo = memo(MultiUnitContainer, areEqual);

export { MultiUnitContainerMemo as MultiUnitContainer };
