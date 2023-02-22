import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

import { Anchor } from "Components/Anchor";

import { GoogleAutocomplete } from "Containers/Address";

import classes from "./createProject.module.css";

interface Props {
  goToEditAddress: (e: any) => void;
  onFormButtonClick: (e: any) => void;
}

const CreateProject = ({ goToEditAddress, onFormButtonClick }: Props) => (
  <div className="d-flex flex-column w-100">
    <h6 className={classes.h6}>Address of Property Loss</h6>
    <form className={`requires-validation g3 ${classes.formBase}`} noValidate action="#" onSubmit={onFormButtonClick}>
      <GoogleAutocomplete />
    </form>
    <Anchor href="#" onClick={goToEditAddress} className={`text-center ${classes.anchor}`}>
      Enter address manually
    </Anchor>
  </div>
);

const CreateProjectMemo = memo(CreateProject, areEqual);

export { CreateProjectMemo as CreateProject };
