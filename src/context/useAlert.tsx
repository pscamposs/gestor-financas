"use client";
import { createContext, ReactNode, useState } from "react";

export const AlertContext = createContext({} as AlertContextProps);

export const AlertContextProvider = ({ children }: { children: ReactNode }) => {
  const [alerts, setAlerts] = useState<AlertProps[]>([]);

  const sendAlert = (alert: AlertProps) => {
    setAlerts((prev) => [...prev, alert]);
    setInterval(
      () => setAlerts((prev) => prev.filter((e) => e !== alert)),
      3000
    );
  };

  return (
    <AlertContext.Provider
      value={{
        alerts,
        sendAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
