import React, { memo, ReactNode, useRef, useCallback, useEffect } from "react";

import { areEqual } from "Utils/equalityChecks";

// This will import direct overrides for Bootstrap classes
import classes from "./tab.module.css";

interface Props {
  id?: string;
  className?: string;
  target?: string;
  icon?: ReactNode;
  tabIndex?: number;
  children: ReactNode | string;
  triggerButtonClick?: boolean;
  onClick: (e: any) => void;
  onKeyUp?: (e: any) => void;
}
const Tab = ({
  id,
  className,
  target,
  icon,
  tabIndex,
  children,
  triggerButtonClick = false,
  onClick,
  onKeyUp,
}: Props) => {
  const buttonRef = useRef(null);

  const refCallback = useCallback((ref) => {
    buttonRef.current = ref;
  }, []);

  useEffect(() => {
    if (triggerButtonClick) {
      buttonRef.current.click();
    }
  }, [triggerButtonClick]);

  return (
    <li className="nav-item" role="presentation">
      <a
        onClick={onClick}
        onKeyUp={onKeyUp}
        className={`nav-link ${classes.anchor} ${classes.anchorCommon} ${className || ""}`}
        id={id}
        data-bs-toggle="tab"
        data-bs-target={`#${target}`}
        role="tab"
        tabIndex={tabIndex}
        aria-controls={target}
        aria-selected="true"
        ref={refCallback}
      >
        {icon && icon}
        {children}
      </a>
    </li>
  );
};

Tab.defaultProps = {
  id: undefined,
  className: undefined,
  icon: undefined,
  tabIndex: undefined,
  target: undefined,
  triggerButtonClick: undefined,
  onKeyUp: undefined,
};
const TabMemo = memo(Tab, areEqual);
export { TabMemo as Tab };
