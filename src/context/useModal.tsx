"use client";
import { createContext, ReactElement, ReactNode, useState } from "react";

interface ModalContextProps {
  isOpen: boolean;
  modal?: ReactElement;
  closeModal: () => void;
  openModal: (modal: ReactElement) => void;
}

const ModalContext = createContext({} as ModalContextProps);

const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<ReactElement>();

  const closeModal = () => setIsOpen(false);
  const openModal = (modal: ReactElement) => {
    setIsOpen(true);
    setModal(modal);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modal,
        closeModal,
        openModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

export { ModalContext, ModalContextProvider };
