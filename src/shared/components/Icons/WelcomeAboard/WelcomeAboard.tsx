import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import WelcomeAboard from "../../../Assets/welcome-aboard.svg";

interface Props {
  className?: string;
  id?: string;
}
const WelcomeAboardSvg = ({ className = "", id }: Props) => <WelcomeAboard id={id} className={`${className || ""}`} />;

WelcomeAboardSvg.defaultProps = {
  className: undefined,
  id: undefined,
};

const WelcomeAboardSvgMemo = memo(WelcomeAboardSvg, areEqualShallow);
export { WelcomeAboardSvgMemo as WelcomeAboardSvg };
