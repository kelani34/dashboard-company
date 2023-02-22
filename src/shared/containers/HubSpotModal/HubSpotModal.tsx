import React, { memo, useEffect, useState } from 'react';
import { areEqual } from 'Utils/equalityChecks';
import { HubSpotModal } from 'Components/HubSpotModal';

const HubSpotModalContainer = ({ visible }: { visible: boolean }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [chosenAction, setChosenAction] = useState(null);

  useEffect(() => {
    if (visible) {
      const script = document.createElement('script');
      script.src = 'https://static.hsappstatic.net/MeetingsEmbed/ex/MeetingsEmbedCode.js';
      document.body.appendChild(script);

      script.addEventListener('load', () => {
        setIsOpen(true);
      });
    }
    return () => isOpen && setIsOpen(false);
  }, [visible]);

  const modalCloseClick = React.useCallback(() => setIsOpen(false), []);
  const chooseBook = React.useCallback(() => setChosenAction(1), []);
  const chooseSkip = React.useCallback(() => setChosenAction(0), []);
  const closeAll = React.useCallback(() => {
    setChosenAction(-1);
    setIsOpen(false);
  }, []);

  return (
    visible && (
      <HubSpotModal
        closeAll={closeAll}
        chosenAction={chosenAction}
        chooseBook={chooseBook}
        chooseSkip={chooseSkip}
        isOpen={isOpen}
        modalCloseClick={modalCloseClick}
      />
    )
  );
};

const HubSpotModalContainerMemo = memo(HubSpotModalContainer, areEqual);

export { HubSpotModalContainerMemo as HubSpotModalContainer };
