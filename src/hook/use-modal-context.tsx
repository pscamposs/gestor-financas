import { useContext } from "react";
import { ModalContext } from "../context/useModal";

export const useModal = () => useContext(ModalContext);
