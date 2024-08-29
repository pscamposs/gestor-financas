import { AlertContext } from "@/context/useAlert";
import { useContext } from "react";

export const useAlert = () => useContext(AlertContext);
