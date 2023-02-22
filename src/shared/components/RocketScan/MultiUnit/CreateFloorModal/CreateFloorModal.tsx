import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { LocationForm } from 'Components/RocketScan';

import classes from './createFloorModal.module.css';

interface Props {
  isOpen?: boolean;
  title: string;
  floorName: string;
  floorNumber: number;
  formErrors: any;
  fetching: boolean;
  hideDropDown: boolean;
  isAccessible: boolean;
  onFloorNameChange: (e: any) => void;
  onCreateFloorFormButtonClick?: (e: any) => void;
  onAccessibleCheckboxClick?: (e: any) => void;
  closeModal: (e: any) => void;
  setFloorNumber: (e: any) => void;
}

const CreateFloorModal = ({
  isOpen = false,
  title,
  floorName,
  floorNumber,
  formErrors,
  fetching,
  hideDropDown,
  isAccessible,
  onAccessibleCheckboxClick,
  onFloorNameChange,
  onCreateFloorFormButtonClick,
  closeModal,
  setFloorNumber,
}: Props) => (
  <Modal
    id="createFloor"
    classes={classes}
    title={`Create ${title}`}
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={closeModal}
  >
    <div>
      <LocationForm
        type="floor"
        title={title}
        locationName={floorName}
        floorNumber={floorNumber}
        formErrors={formErrors}
        fetching={fetching}
        hideDropDown={hideDropDown}
        onLocationChange={onFloorNameChange}
        isAccessible={isAccessible}
        onAccessibleCheckboxClick={onAccessibleCheckboxClick}
        onFormButtonClick={onCreateFloorFormButtonClick}
        setFloorNumber={setFloorNumber}
      />
    </div>
  </Modal>
);

CreateFloorModal.defaultProps = {
  isOpen: false,
  onCreateFloorFormButtonClick: undefined,
  onAccessibleCheckboxClick: undefined,
};

const CreateFloorModalMemo = memo(CreateFloorModal, areEqual);

export { CreateFloorModalMemo as CreateFloorModal };
