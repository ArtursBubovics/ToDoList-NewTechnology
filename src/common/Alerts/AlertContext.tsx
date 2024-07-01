import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Alerts } from './Alert';

type AlertStatus = 'success' | 'info' | 'warning' | 'error';

interface Alert {
  message: string;
  status: AlertStatus;
}

interface AlertContextType {
  alert: Alert | null;
  setAlert: (message: string, status: AlertStatus) => void;
  clearAlert: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlert must be used within an AlertProvider');
  }
  return context;
};

export const AlertProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [alert, setAlertState] = useState<Alert | null>(null);

  const setAlert = (message: string, status: AlertStatus) => {
    setAlertState({ message, status });
  };

  const clearAlert = () => {
    setAlertState(null);
  };

  useEffect(() => {
    setTimeout(() => {
        clearAlert()
    }, 7000);
  }, [alert]);

  return (
    <AlertContext.Provider value={{ alert, setAlert, clearAlert }}>
      {children}
      {alert && (
        <Alerts message={alert.message} status={alert.status} />
      )}
    </AlertContext.Provider>
  );
};
