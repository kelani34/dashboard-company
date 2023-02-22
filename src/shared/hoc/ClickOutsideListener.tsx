import React, { ReactNode, useCallback, useEffect, useRef } from 'react';

interface Props {
  children: ReactNode;
  clickOutside: (e: any) => void;
}

const ClickOutsideListener = ({ children, clickOutside }: Props) => {
  const childRef = useRef(null);
  const eventHandler = useCallback((e: any) => {
    if (!childRef.current) {
      return;
    }
    if (document.contains(e.target) && !childRef.current.contains(e.target)) clickOutside(e);
  }, []);

  useEffect(() => {
    document.addEventListener('click', eventHandler);
    return () => {
      document.removeEventListener('click', eventHandler);
    };
  }, []);

  return (
    <div
      ref={(ref) => {
        childRef.current = ref;
      }}
    >
      {children}
    </div>
  );
};

export default ClickOutsideListener;
