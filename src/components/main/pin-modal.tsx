import React from "react";
import Modal from "@/src/components/modal/modal";
import { DetailData } from "@/src/components/map/map";
import useModal from "@/src/hooks/useModal";

export interface PinModalProps {
  data?: DetailData;
  openModal: boolean;
  onModalClose: () => void;
}

const PinModal = ({ data, openModal, onModalClose }: PinModalProps) => {
  return (
    <Modal isOpen={openModal} onClose={onModalClose}>
      <Modal.Content
        className={
          "bg-[white] text-[black] fixed top-[50%] left-[50%] border border-[blue]"
        }
      >
        <p>{data?.dong}</p>
        <p>{data?.address}</p>
        <p></p>
      </Modal.Content>
    </Modal>
  );
};

export default PinModal;
