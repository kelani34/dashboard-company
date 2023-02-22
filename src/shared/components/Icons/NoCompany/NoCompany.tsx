import React, { memo } from "react";

import { areEqualShallow } from "Utils/equalityChecks";
import NoCompany from "../../../Assets/no-company.svg";

interface Props {
  className?: string;
  id?: string;
}
const NoCompanySvg = ({ className = "", id }: Props) => <NoCompany id={id} className={`${className || ""}`} />;

NoCompanySvg.defaultProps = {
  className: undefined,
  id: undefined,
};

const NoCompanySvgMemo = memo(NoCompanySvg, areEqualShallow);
export { NoCompanySvgMemo as NoCompanySvg };
