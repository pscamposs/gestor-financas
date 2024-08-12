import { useContext } from "react";
import { ModalContext } from "../context/useModal";

const useModal = () => useContext(ModalContext);
export default useModal;
