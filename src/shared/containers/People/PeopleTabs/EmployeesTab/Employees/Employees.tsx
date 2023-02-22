import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';

import { EmployeeCard } from 'Containers/People';
import { LetterHeader } from 'Components/People/PeopleTabs/LetterHeader/LetterHeader';

interface Props {
  employeesInitials: any[];
  selectCardClick: (employee: any) => void;
}

const Employees = ({ employeesInitials, selectCardClick }: Props) => (
  <>
    {employeesInitials.length > 0 &&
      employeesInitials.map(({ initial, employees }: any) => (
        <LetterHeader key={initial} name={initial}>
          {employees.map((employee: any) => (
            <EmployeeCard key={employee.id} employee={employee} onClickEmployeeCard={selectCardClick} />
          ))}
        </LetterHeader>
      ))}
  </>
);

const EmployeesMemo = memo(Employees, areEqual);

export { EmployeesMemo as Employees };
