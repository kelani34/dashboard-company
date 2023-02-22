import React, { memo, useCallback } from "react";
import { useHistory } from "react-router-dom";

import { areEqual } from "Utils/equalityChecks";

import { CreateProject } from "Components/Projects";

const CreateProjectContainer = () => {
  const history = useHistory();

  const goToEditAddress = useCallback((e: any) => {
    e.preventDefault();
    setTimeout(() => {
      history.push("/projects/editAddress");
    }, 500);
  }, []);

  const onFormButtonClick = useCallback((e: any) => {
    e.preventDefault();
  }, []);

  return <CreateProject goToEditAddress={goToEditAddress} onFormButtonClick={onFormButtonClick} />;
};

const CreateProjectContainerMemo = memo(CreateProjectContainer, areEqual);

export { CreateProjectContainerMemo as CreateProjectContainer };
