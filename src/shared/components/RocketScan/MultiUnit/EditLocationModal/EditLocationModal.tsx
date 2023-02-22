import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { LocationForm } from 'Components/RocketScan';

import classes from './editLocationModal.module.css';

interface Props {
  isCommercialProperty?: boolean;
  isOpen?: boolean;
  type: string;
  title: string;
  isCommercial: boolean;
  isAccessible: boolean;
  locationName: string;
  floorNumber: number;
  formErrors: any;
  fetching: boolean;
  hideDropDown: boolean;
  onCommercialCheckboxClick?: (e: any) => void;
  onAccessibleCheckboxClick?: (e: any) => void;
  onLocationNameChange: (e: any) => void;
  onSaveChangesFormButtonClick?: (e: any) => void;
  closeModal: (e: any) => void;
  setFloorNumber: (e: any) => void;
}

const EditLocationModal = ({
  isCommercialProperty,
  isOpen,
  type,
  title,
  isCommercial,
  isAccessible,
  locationName,
  floorNumber,
  formErrors,
  fetching,
  hideDropDown,
  onCommercialCheckboxClick,
  onAccessibleCheckboxClick,
  onLocationNameChange,
  onSaveChangesFormButtonClick,
  closeModal,
  setFloorNumber,
}: Props) => (
  <Modal
    id="edit-location"
    classes={classes}
    title={`Edit ${type}`}
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={closeModal}
  >
    <div>
      <LocationForm
        type={type}
        isCommercialProperty={isCommercialProperty}
        formType="edit"
        title={title}
        isCommercial={isCommercial}
        isAccessible={isAccessible}
        locationName={locationName}
        floorNumber={floorNumber}
        formErrors={formErrors}
        fetching={fetching}
        hideDropDown={hideDropDown}
        onCommercialCheckboxClick={onCommercialCheckboxClick}
        onAccessibleCheckboxClick={onAccessibleCheckboxClick}
        onLocationChange={onLocationNameChange}
        onFormButtonClick={onSaveChangesFormButtonClick}
        setFloorNumber={setFloorNumber}
      />
    </div>
  </Modal>
);

EditLocationModal.defaultProps = {
  isCommercialProperty: false,
  isOpen: false,
  onSaveChangesFormButtonClick: undefined,
  onCommercialCheckboxClick: undefined,
  onAccessibleCheckboxClick: undefined,
};

const EditLocationModalMemo = memo(EditLocationModal, areEqual);

export { EditLocationModalMemo as EditLocationModal };
