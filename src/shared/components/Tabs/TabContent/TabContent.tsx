import React, { memo } from "react";
import { areEqual } from "Utils/equalityChecks";

interface Props {
  id: string;
  className?: string;
  children: any;
}
const TabContent = ({ id, className, children }: Props) => (
  <div className={`tab-pane fade ${className || ""}`} id={id} role="tabpanel" aria-labelledby={id}>
    <div className="container-fluid px-0">{children}</div>
  </div>
);
TabContent.defaultProps = {
  className: undefined,
};

const TabContentMemo = memo(TabContent, areEqual);
export { TabContentMemo as TabContent };
