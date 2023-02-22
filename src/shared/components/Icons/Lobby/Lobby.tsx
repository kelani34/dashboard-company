import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import Lobby from "../../../Assets/lobby.svg";

// Custom css
import classes from "./lobby.module.css";

interface Props {
  className?: string;
  id?: string;
  onClick?: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const LobbySvg = ({ className = "", id, onClick, onKeyUp }: Props) => (
  <Lobby id={id} className={`${classes.lobbyBase} ${className || ""}`} onClick={onClick} onKeyUp={onKeyUp} />
);

LobbySvg.defaultProps = {
  className: undefined,
  id: undefined,
  onClick: undefined,
  onKeyUp: undefined,
};

const LobbySvgMemo = memo(LobbySvg, areEqualShallow);
export { LobbySvgMemo as LobbySvg };
