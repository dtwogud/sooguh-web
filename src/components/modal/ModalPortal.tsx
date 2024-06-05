import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { ModalProps } from "@/components/common/modal/Modal";

const ModalPortal = ({ open, children }: ModalProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return ReactDOM.createPortal(open && children, document.body);
};

export default ModalPortal;
