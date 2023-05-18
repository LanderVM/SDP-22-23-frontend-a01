import {
  createContext, useMemo, useState,
} from 'react';
import useNotifications from '../api/notification';

export const NotificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const notificationApi = useNotifications();

  const [amountNotReadNotifications, setAmountNotReadNotifications] = useState(0);

  const refreshAmountNotReadNotifications = async () => {
    try {
      const fetchAmountNotRead = async () => {
        const data = await notificationApi.getAmountNotRead();
        setAmountNotReadNotifications(data);
      };
      fetchAmountNotRead();
    } catch (error) {
      console.log(error);
    }
  };

  const value = useMemo(() => (
    {
      amountNotReadNotifications, refreshAmountNotReadNotifications, setAmountNotReadNotifications,
    }
  ), [amountNotReadNotifications, refreshAmountNotReadNotifications, setAmountNotReadNotifications]);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}
