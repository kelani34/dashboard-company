import React, { useEffect, useRef, useState, MouseEvent, ReactNode, memo } from 'react';

import { areEqual } from 'Utils/equalityChecks';

import { CloseButton } from 'Components/Button/CloseButton';
import { Modal as BsModal } from 'bootstrap';
import { Icon } from 'Components/Icons';

interface CssClasses {
  modal?: string;
  modalDialog?: string;
  modalContent?: string;
  modalHeader?: string;
  modalTitle?: string;
  modalBody?: string;
  modalFooter?: string;
  closeButtonClass?: string;
  saveButtonClass?: string;
}

interface Props {
  // Attributes
  children: ReactNode;
  titleIcon?: boolean;
  classes?: CssClasses;
  id?: string;
  title: string;
  isOpen: boolean;
  closeButtonText?: string;
  modalHeader?: boolean;
  leftHeaderIcon?: string;
  modalFooter?: boolean;
  useCircleCloseButton?: boolean;
  footerButtons?: ReactNode;
  // Data Attributes
  dataBsBackdrop?: string;
  dataBsKeyboard?: string;
  // Events
  modalOpen?: () => void;
  onLeftHeaderIconClick?: (e: MouseEvent) => void;
  modalCloseClick?: (e: MouseEvent) => void;
  setIsOpen?: (isOpen: boolean) => void;
  toast?: ReactNode;
}

const Modal = ({
  children,
  classes,
  id = 'modalId',
  title,
  isOpen = false,
  closeButtonText = 'Close',
  modalHeader,
  leftHeaderIcon,
  modalFooter,
  titleIcon,
  useCircleCloseButton = false,
  footerButtons,
  modalOpen,
  onLeftHeaderIconClick,
  modalCloseClick,
  setIsOpen,
  dataBsBackdrop,
  dataBsKeyboard,
  toast,
}: Props) => {
  const [modal, setModal] = useState(null);
  const modalRef = useRef(undefined);

  useEffect(() => {
    // Instantiate the bs modal
    if (!modal) setModal(new BsModal(modalRef.current));

    // If the modal exists and the user wants it open, open it
    if (modal && isOpen) {
      modal.show();

      // If the parent sends in a method to handle the modal open.
      if (modalOpen) modalOpen();
    }

    // If the modal exists and the user wants it close, close it
    if (modal && !isOpen) {
      modal.hide();
    }

    return () => {
      if (modal && isOpen) {
        modal.hide();
      }
    };
  }, [isOpen, modal]);

  const onModalOpeCloseClick = (e: MouseEvent) => {
    e.preventDefault();
    modal.hide();

    // If the parent sends in a method to handle the modal close, fire it
    if (modalCloseClick) modalCloseClick(e);

    // Reset the isOpen prop, sent in by the parent
    if (setIsOpen) setIsOpen(!isOpen);
  };
  return (
    <div
      className={`modal fade ${classes?.modal ? classes?.modal : ''}`}
      ref={(ref: HTMLDivElement) => {
        // Set the ref.current to the ref, before useEffect is called.
        modalRef.current = ref;
      }}
      tabIndex={-1}
      id={id}
      aria-labelledby={id}
      aria-hidden="true"
      data-bs-backdrop={dataBsBackdrop}
      data-bs-keyboard={dataBsKeyboard}
    >
      <div className={`modal-dialog modal-dialog-centered ${classes?.modalDialog ? classes?.modalDialog : ''}`}>
        <div className={`modal-content ${classes?.modalContent ? classes?.modalContent : ''}`}>
          {modalHeader && (
            <div className={`modal-header ${classes?.modalHeader ? classes?.modalHeader : ''}`}>
              {leftHeaderIcon && !titleIcon ? <Icon type={leftHeaderIcon} onClick={onLeftHeaderIconClick} /> : <></>}
              <h5 className={`modal-title ${classes?.modalTitle ? classes?.modalTitle : ''}`} id={id}>
                {titleIcon && <Icon type={leftHeaderIcon} onClick={onLeftHeaderIconClick} />} {title}
              </h5>
              <a href="#" role="button" onClick={onModalOpeCloseClick} aria-label="Close">
                <Icon type="modalClose" />
              </a>
            </div>
          )}

          <div className={`modal-body ${classes?.modalBody ? classes?.modalBody : ''}`}>{children}</div>

          {useCircleCloseButton && (
            <div className="modal-body d-flex align-items-end justify-content-end">
              <CloseButton onClick={onModalOpeCloseClick} />
            </div>
          )}

          {modalFooter && (
            <div className={`modal-footer ${classes?.modalFooter ? classes?.modalFooter : ''}`}>
              <button
                type="button"
                className={`btn ${classes?.closeButtonClass ? classes?.closeButtonClass : 'btn-primary'}`}
                onClick={onModalOpeCloseClick}
              >
                {closeButtonText}
              </button>
              {footerButtons}
            </div>
          )}
          {toast}
        </div>
      </div>
    </div>
  );
};

Modal.defaultProps = {
  classes: undefined,
  id: undefined,
  closeButtonText: undefined,
  modalHeader: false,
  leftHeaderIcon: undefined,
  modalFooter: false,
  modalOpen: undefined,
  modalCloseClick: undefined,
  onLeftHeaderIconClick: undefined,
  setIsOpen: undefined,
  useCircleCloseButton: false,
  footerButtons: undefined,
  dataBsBackdrop: 'static',
  dataBsKeyboard: 'false',
  titleIcon: undefined,
  toast: undefined,
};

const ModalMemo = memo(Modal, areEqual);
export { ModalMemo as Modal };
