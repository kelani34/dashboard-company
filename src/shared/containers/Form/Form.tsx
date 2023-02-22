import React, { memo, ReactNode } from 'react';

import { areEqualShallow } from 'Utils/equalityChecks';
import { Form } from 'Components/Form';

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
const FormContainer = ({ id, className, noValidate = true, submitButton, children, onSubmit }: Props) => (
  // Using a reference is how we are going to do things the React way, with Bootstrap.

  <Form id={id} className={className} noValidate={noValidate} onSubmit={onSubmit}>
    {children}
    {submitButton && <div className="col-12">{submitButton}</div>}
  </Form>
);
FormContainer.defaultProps = {
  id: undefined,
  className: undefined,
  noValidate: true,
  submitButton: undefined,
};

const FormContainerMemo = memo(FormContainer, areEqualShallow);

export { FormContainerMemo as Form };
