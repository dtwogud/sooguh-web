import { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "@/src/components/modal/modal";

interface ModalPortalProps extends Pick<ModalProps, "isOpen"> {
  children: ReactNode;
}

const ModalPortal = ({ children, isOpen }: ModalPortalProps) => {
  useEffect(() => {
    if (!document || !document.body) {
      throw new Error("document.body is not defined");
    }

    return () => {
      // Clean up code if needed
    };
  }, []); // Run this effect only once on component mount

  return isOpen ? ReactDOM.createPortal(children, document.body) : null;
};

export default ModalPortal;
