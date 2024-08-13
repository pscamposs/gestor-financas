import { createContext, useState } from "react";

interface AlertProps {
  title: string;
  message: string;
  variant: "success" | "error" | "info";
}

interface AlertContextProps {
  sendAlert: (alert: AlertProps) => void;
}

export const AlertContext = createContext({} as AlertContextProps);

export const AlertContextProvider = ({
  children,
}: {
  children: React.ReactElement;
}) => {
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
        sendAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};
