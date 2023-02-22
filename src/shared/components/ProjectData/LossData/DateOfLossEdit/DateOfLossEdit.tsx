import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import DatePicker from 'react-datepicker';

import { Label } from 'Components/Label';

import formClasses from 'Themes/form/form.module.css';
import classes from './dateOfLossEdit.module.css';
import 'react-datepicker/dist/react-datepicker-min.module.css';

interface Props {
  lossDate: any;
  onLossDateChange: (date: any) => void;
}

const DateOfLossEdit = ({ lossDate, onLossDateChange }: Props) => (
  <div className={classes.container}>
    <Label ariaLabel="Date of Loss (Optional)" className={classes.label}>
      Date of Loss (Optional)
    </Label>
    <DatePicker
      selected={lossDate}
      onChange={onLossDateChange}
      isClearable
      maxDate={new Date()}
      className={`form-control ${formClasses.validateField} ${formClasses.validField}`}
    />
  </div>
);

const DateOfLossEditMemo = memo(DateOfLossEdit, areEqual);

export { DateOfLossEditMemo as DateOfLossEdit };
