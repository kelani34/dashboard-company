import React, { memo, ReactNode, useCallback, useRef, useState } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import { useDebounce } from "Hooks/useDebounce";

interface Props {
  id?: string;
  className?: string;
  noValidate?: boolean;
  submitButton?: ReactNode;
  children: any;
  onSubmit: (formValues: any) => void;
}

/*
  Note:
    The form can use either a Submit button or the internal onChange to send form data back to the user

    A form button needs to be pass in through props and not children.  We need a way to detect if a button
    is being used or not to handle the form submission
*/
const Form = ({ id, className, noValidate = true, submitButton, onSubmit, children }: Props) => {
  // Using a reference is how we are going to do things the React way, with Bootstrap.
  const formRef = useRef(null);
  const [formData, setFormData] = useState({});
  const validate = useCallback(
    (formData: any) => {
      onSubmit(formData);
    },
    [formData]
  );

  const submitWhenNoSubmitButton = (e: any) => {
    e.preventDefault();
  };

  // This will be the loca form submit.
  const onSubmitLocal = useDebounce((e: any) => {
    e.preventDefault();

    formRef.current.classList.add("was-validated");

    let value = "";
    switch (e.target.type) {
      case "checkbox":
        value = e.target.checked;
        break;
      case "text":
      case "tel":
      case "email":
        value = e.target.value.trim();
        break;
      default:
        break;
    }

    // This will handle an empty input
    if (value?.length === 0) {
      validate({ [e.target.name]: e.target.value, isValid: true });
      formRef.current.classList.remove("was-validated");
      return;
    }

    if (!formRef.current.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();

      // This will let the parent know that validation is false
      validate({ [e.target.name]: e.target.value, isValid: false });
      return;
    }

    // Update the control value in formData
    setFormData({
      ...formData,
      [e.target.name]: value,
    });

    // Pass formdata to the parent to check if
    validate({
      ...formData,
      [e.target.name]: e.target.value,
      isValid: true,
      isFinishedValidation: true,
    });
  }, 700);

  const onChange = (e: any) => {
    // If the submitButton prop does not exist, then trigger onSubmitLocal
    if (!submitButton) onSubmitLocal(e);
  };

  return (
    <div className="container-fluid">
      <form
        onChange={onChange}
        ref={(ref) => {
          formRef.current = ref;
        }}
        onSubmit={(submitButton && onSubmitLocal) || submitWhenNoSubmitButton}
        id={id}
        className={`requires-validation ${className || ""}`}
        noValidate={noValidate}
      >
        {children}

        {submitButton && <div className="col-12">{submitButton}</div>}
      </form>
    </div>
  );
};

Form.defaultProps = {
  id: undefined,
  className: undefined,
  noValidate: true,
  submitButton: undefined,
};

const FormMemo = memo(Form, areEqualShallow);

export { FormMemo as Form };
