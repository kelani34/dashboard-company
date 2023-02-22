import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Modal } from 'Components/Modal';
import { LocationForm } from 'Components/RocketScan';

import classes from './createUnitModal.module.css';

interface Props {
  isCommercialProperty?: boolean;
  isOpen?: boolean;
  title: string;
  isCommercial?: boolean;
  isAccessible?: boolean;
  unitName: string;
  floorNumber: number;
  formErrors: any;
  fetching: boolean;
  hideDropDown: boolean;
  onUnitNameChange: (e: any) => void;
  onCommercialCheckboxClick?: (e: any) => void;
  onAccessibleCheckboxClick?: (e: any) => void;
  onCreateUnitFormButtonClick?: (e: any) => void;
  closeModal: (e: any) => void;
  setFloorNumber: (e: any) => void;
}

const CreateUnitModal = ({
  isCommercialProperty,
  isOpen,
  title,
  isCommercial,
  isAccessible,
  unitName,
  floorNumber,
  formErrors,
  fetching,
  hideDropDown,
  onUnitNameChange,
  onCommercialCheckboxClick,
  onAccessibleCheckboxClick,
  onCreateUnitFormButtonClick,
  closeModal,
  setFloorNumber,
}: Props) => (
  <Modal
    id="createUnit"
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
        type="unit"
        isCommercialProperty={isCommercialProperty}
        title={title}
        locationName={unitName}
        floorNumber={floorNumber}
        isCommercial={isCommercial}
        isAccessible={isAccessible}
        formErrors={formErrors}
        fetching={fetching}
        hideDropDown={hideDropDown}
        onLocationChange={onUnitNameChange}
        onCommercialCheckboxClick={onCommercialCheckboxClick}
        onAccessibleCheckboxClick={onAccessibleCheckboxClick}
        onFormButtonClick={onCreateUnitFormButtonClick}
        setFloorNumber={setFloorNumber}
      />
    </div>
  </Modal>
);

CreateUnitModal.defaultProps = {
  isCommercialProperty: false,
  isOpen: false,
  isCommercial: false,
  isAccessible: false,
  onCommercialCheckboxClick: undefined,
  onAccessibleCheckboxClick: undefined,
  onCreateUnitFormButtonClick: undefined,
};

const CreateUnitModalMemo = memo(CreateUnitModal, areEqual);

export { CreateUnitModalMemo as CreateUnitModal };
