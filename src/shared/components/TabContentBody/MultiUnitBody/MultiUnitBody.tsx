import React, { memo } from 'react';

import { Icon } from 'Components/Icons';
import { TileButton } from 'Components/Button/TileButton';

import { areEqual } from 'Utils/equalityChecks';
import { CreateUnit, CreateFloor, Locations, CreateExterior } from 'Containers/RocketScan';

import classes from './multiUnitBody.module.css';

interface Props {
  isCommercialProperty?: boolean;
  isUnitModalOpen?: boolean;
  isFloorModalOpen?: boolean;
  localLocationCreated: boolean;
  isSelectingPhotoMode?: boolean;
  setUnitModalStatus?: (e: any) => void;
  setFloorModalStatus?: (e: any) => void;
  closeModal: (e: any) => void;
  setLocalLocationCreated: (e: any) => void;
}

const MultiUnitBody = ({
  isCommercialProperty,
  isUnitModalOpen,
  isFloorModalOpen,
  localLocationCreated,
  isSelectingPhotoMode,
  setUnitModalStatus,
  setFloorModalStatus,
  closeModal,
  setLocalLocationCreated,
}: Props) => (
  <div className={`container-fluid d-flex px-4 ${classes.bodyArea}`}>
    <div className={`col-3 d-flex flex-column justify-content-start align-items-start pt-0 ${classes.buttonColumn}`}>
      <TileButton
        caption="Create Unit +"
        onTileClick={setUnitModalStatus}
        icon={<Icon type="unitadd" />}
        sizeSmall
        disabled={isSelectingPhotoMode}
      />
      <CreateUnit
        isCommercialProperty={isCommercialProperty}
        isOpen={isUnitModalOpen}
        closeModal={closeModal}
        localLocationCreated={localLocationCreated}
        setLocalLocationCreated={setLocalLocationCreated}
      />

      {!isCommercialProperty && (
        <>
          <TileButton
            caption="Create Floor / Common Areas +"
            onTileClick={setFloorModalStatus}
            icon={<Icon type="flooradd" />}
            sizeSmall
            disabled={isSelectingPhotoMode}
          />
          <CreateFloor
            isOpen={isFloorModalOpen}
            closeModal={closeModal}
            localLocationCreated={localLocationCreated}
            setLocalLocationCreated={setLocalLocationCreated}
          />
          <CreateExterior />
        </>
      )}
    </div>
    <div
      className={`col d-flex flex-column justify-content-start align-items-start position-relative ${classes.contentColumn}`}
    >
      <Locations />
    </div>
  </div>
);
MultiUnitBody.defaultProps = {
  isCommercialProperty: false,
  isUnitModalOpen: false,
  setUnitModalStatus: undefined,
  isFloorModalOpen: false,
  setFloorModalStatus: undefined,
  isSelectingPhotoMode: false,
};
const MultiUnitBodyMemo = memo(MultiUnitBody, areEqual);

export { MultiUnitBodyMemo as MultiUnitBody };
