import InvoiceModal from "@/components/modal/InvoiceModal";
import { createContext, useState } from "react";

interface ModalContextProps {
  isOpen: boolean;
  modal?: React.ReactElement;
  closeModal: () => void;
  openModal: (modal: React.ReactElement) => void;
}

const ModalContext = createContext({} as ModalContextProps);

const ModalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modal, setModal] = useState<React.ReactElement>();

  const closeModal = () => setIsOpen(false);
  const openModal = (modal: React.ReactElement) => {
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
