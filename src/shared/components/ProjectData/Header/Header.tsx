import React, { memo } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { Button } from 'Components/Button';
import classes from './header.module.css';

interface Props {
  title: string;
  // eslint-disable-next-line
  editIsOpen?: boolean;
  onEditButtonClick: (e: any) => void;
}

const Header = ({
  title,
  // eslint-disable-next-line
  // editIsOpen,
  onEditButtonClick,
}: Props) => (
  <div className={`d-flex flex-row justify-content-between align-items-center ${classes.header}`}>
    <div className={classes.title}>{title}</div>
    {/* Remove show/hide toggle once other buttons in place */}
    <Button className={classes.editDataButton} onClick={onEditButtonClick}>
      Edit
    </Button>
    {/* uncomment once all three sections have a cancel button in place  */}
    {/* {!editIsOpen && (
      <Button className={classes.editDataButton} onClick={onEditButtonClick}>
        Edit
      </Button>
    )} */}
  </div>
);
Header.defaultProps = {
  editIsOpen: undefined,
};
const HeaderMemo = memo(Header, areEqual);

export { HeaderMemo as Header };
