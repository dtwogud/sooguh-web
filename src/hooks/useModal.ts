import React, { useState } from "react";

const useModal = () => {
  const [openModal, setOpenModal] = useState(false);

  const handleModalOpen = () => {
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  return {
    openModal,
    onModalOpen: handleModalOpen,
    onModalClose: handleModalClose,
  };
};

export default useModal;
