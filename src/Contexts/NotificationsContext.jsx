import { createContext, useMemo, useState } from 'react';
import useNotifications from '../api/notification';

export const NotificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const notificationApi = useNotifications();

  const [amountNotReadNotifications, setAmountNotReadNotifications] = useState(0);

  const refreshAmountNotReadNotifications = async () => {
    try {
      const data = await notificationApi.getAmountNotRead();
      setAmountNotReadNotifications(data);
    } catch (error) {
      console.log(error);
    }
  };
  const value = useMemo(() => (
    {
      amountNotReadNotifications, refreshAmountNotReadNotifications,
    }
  ), []);

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}
