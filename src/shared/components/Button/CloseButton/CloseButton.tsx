import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import { Button } from "../Button";
import { Icon } from "Components/Icons";
import classes from "./closeButton.module.css"

interface Props {
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
// This button is based on the BS close button and is used to close anything that needs closing.
const CloseButton = ({ onClick, onKeyUp }: Props) => (
  <Button onClick={onClick} onKeyUp={onKeyUp} type="button" aria-label="Close"
  className={`${classes.btnBase} ${classes.closeButton} rounded-circle`}>
    <Icon type="plus" className={`${classes.closeButtonIcon}`} />
  </Button>
);

CloseButton.defaultProps = {
  onClick: undefined,
  onKeyUp: undefined,
};
// This to allows default props
const CloseButtonMemo = memo(CloseButton, areEqualShallow);

// Export it with the correct name
export { CloseButtonMemo as CloseButton };
