import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { PurpleButton } from 'Components/Button';
import { Modal } from 'Components/Modal';
import { Label } from 'Components/Label';
import { OptionToolBar } from 'Containers/OptionToolBar';
import { OptionsDropDown, AffectedLocationDamageTypeButton } from 'Containers/ProjectData';

import classes from './affectedLocationModal.module.css';

interface Props {
  unitName: string;
  isOpen: boolean;
  propertyDamageTypes: any[];
  selectedDamageTypes: any[];
  unitIsDamageSource: number;
  damageSourceOptions: any[];
  isButtonEnabled: boolean;
  sourceRoomOptions: any[];
  sourceRoomInput: any;
  damageCauseOptions: any[];
  damageCauseInput: any;
  asbestosStatusOptions: any[];
  asbestosStatusInput: any;
  onCloseClick: (e: any) => void;
  setUnitIsDamageSource: (e: any) => void;
  setSourceRoomInput: (e: any) => void;
  setDamageCauseInput: (e: any) => void;
  setAsbestosStatusInput: (e: any) => void;
  setLocationDamageTypes: (e: any) => void;
  onFormSubmit: (e: any) => void;
}

const AffectedLocationModal = ({
  unitName,
  isOpen,
  selectedDamageTypes,
  propertyDamageTypes,
  unitIsDamageSource,
  damageSourceOptions,
  isButtonEnabled,
  sourceRoomOptions,
  sourceRoomInput,
  damageCauseOptions,
  damageCauseInput,
  asbestosStatusOptions,
  asbestosStatusInput,
  onCloseClick,
  setUnitIsDamageSource,
  setDamageCauseInput,
  setSourceRoomInput,
  setAsbestosStatusInput,
  setLocationDamageTypes,
  onFormSubmit,
}: Props) => (
  <Modal
    id="affected-location-modal"
    classes={classes}
    title={unitName}
    isOpen={isOpen}
    modalHeader
    dataBsBackdrop="static"
    dataBsKeyboard="false"
    modalCloseClick={onCloseClick}
  >
    <Label ariaLabel="Select from Damages in Unit" className={classes.label}>
      Select from Damages in Unit
    </Label>
    <div className={classes.damageTypeButtons}>
      {propertyDamageTypes.map((damageType) => (
        <AffectedLocationDamageTypeButton
          key={damageType.id}
          damageType={damageType}
          selectedDamageTypes={selectedDamageTypes}
          setSelectedDamageTypes={setLocationDamageTypes}
        />
      ))}
    </div>
    <Label ariaLabel="Unit is Damage Source" className={classes.label}>
      Unit is Damage Source
    </Label>
    <OptionToolBar
      optionNames={damageSourceOptions}
      classificationId={unitIsDamageSource}
      setClassificationId={setUnitIsDamageSource}
    />

    {unitIsDamageSource === 1 && (
      <>
        <OptionsDropDown
          className="source-room-selector"
          label="Source Room"
          placeHolder="Select Source Room"
          items={sourceRoomOptions}
          optionSelectedId={sourceRoomInput}
          setStatusSelected={setSourceRoomInput}
        />
        <OptionsDropDown
          className="source-room-selector"
          label="Damage Cause (optional)"
          placeHolder="Select Damage Cause"
          items={damageCauseOptions}
          optionSelectedId={damageCauseInput}
          setStatusSelected={setDamageCauseInput}
        />
      </>
    )}
    <OptionsDropDown
      className="asbestos-status-selector"
      label="Asbestos Status (optional)"
      placeHolder="Select Asbestos Status"
      items={asbestosStatusOptions}
      optionSelectedId={asbestosStatusInput}
      setStatusSelected={setAsbestosStatusInput}
    />
    <div className={classes.buttonWrapper}>
      <PurpleButton outlined className={classes.button} onClick={onCloseClick}>
        Cancel
      </PurpleButton>
      <PurpleButton className={classes.button} disabled={!isButtonEnabled} onClick={onFormSubmit}>
        Save
      </PurpleButton>
    </div>
  </Modal>
);

const AffectedLocationModalMemo = memo(AffectedLocationModal, areEqual);

export { AffectedLocationModalMemo as AffectedLocationModal };
