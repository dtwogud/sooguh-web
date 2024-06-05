import React, { useEffect } from "react";
import styled from "styled-components";
import { down } from "styled-breakpoints";
import ModalPortal from "@/components/common/modal/ModalPortal";
import useScroll from "@/hooks/useScroll";

export interface ModalProps {
  open: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
}

export interface ModalContentProps {
  title?: string;
  children?: React.ReactNode;
}

const ModalContent = ({ title, children }: ModalContentProps) => {
  return (
    <ModalWrapper
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      {title && <ModalTitle>{title}</ModalTitle>}
      <section>{children}</section>
    </ModalWrapper>
  );
};

function Modal({ open, onClose, children, ...rest }: ModalProps) {
  const { preventScroll, allowScroll } = useScroll();

  useEffect(() => {
    if (open) {
      const prevScrollY = preventScroll();
      return () => {
        allowScroll(prevScrollY);
      };
    }
  }, [open]);

  useEffect(() => {
    const close = (e: any) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    if (!open) return;
    window.addEventListener("keyup", close);
    return () => window.removeEventListener("keyup", close);
  }, [open]);

  return (
    <ModalPortal open={open}>
      <Wrapper {...rest} onClick={onClose}>
        {children}
      </Wrapper>
    </ModalPortal>
  );
}

Modal.Content = ModalContent;

export default Modal;

const Wrapper = styled.section`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  z-index: var(--z-index-modal);

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(0, 0, 0, 0.4);

  transition: padding, 0.3s;

  padding: 60px calc((100% - 840px) / 2);

  ${down("tablet")} {
    padding: 118px 16px;
  }
`;

const ModalWrapper = styled.div`
  width: 100%;
  max-height: calc(100% - 74px);
  position: relative;
  margin: auto;
  padding: 62px 180px 48px 180px;

  display: flex;
  flex-direction: column;

  background: white;

  overflow-y: scroll;

  ${down("tablet")} {
    padding: 62px 10px;
  }
`;

const ModalTitle = styled.h1`
  min-height: 60px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 43px;

  font-size: 22px;
  font-weight: 500;
  letter-spacing: normal;
  text-align: center;
`;
