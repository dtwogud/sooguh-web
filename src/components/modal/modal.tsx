import React, { HTMLAttributes, useCallback, useEffect } from "react";
import ModalPortal from "@/src/components/modal/modalPortal";
import ModalContent from "@/src/components/modal/modalContent";
import useScroll from "@/src/hooks/useScroll";

export interface ModalProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  blockEscClose?: boolean;
}

const Modal = ({
  children,
  isOpen = false,
  onClose,
  onClick,
  blockEscClose = false,
  ...props
}: ModalProps) => {
  const { preventScroll, allowScroll } = useScroll();
  const handleKeydownClose = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape" && onClose) {
        onClose();
      }
    },
    [onClose],
  );

  useEffect(() => {
    const prevScrollY = preventScroll();
    if (isOpen) {
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      onClose();
    }

    if (isOpen && !blockEscClose) {
      window.addEventListener("keyup", handleKeydownClose);

      return () => {
        window.removeEventListener("keyup", handleKeydownClose);
      };
    }
  }, [isOpen, blockEscClose, onClose, handleKeydownClose]);

  return (
    <ModalPortal isOpen={isOpen}>
      <div
        className={`${
          isOpen ? "visible z-modal opacity-100" : "hidden"
        } transition-visibility fixed left-0 top-0 h-full w-full bg-[black] bg-opacity-40 transition-opacity delay-200 z-[100] `}
        role="dialog"
        aria-hidden={!isOpen}
        {...props}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          onClick?.(event);
          onClose();
        }}
      >
        {children}
      </div>
    </ModalPortal>
  );
};

Modal.Content = ModalContent;

export default Modal;
