import {
  createContext, useCallback, useMemo, useState,
} from 'react';
import useNotifications from '../api/notification';

export const NotificationsContext = createContext();

export default function NotificationsProvider({ children }) {
  const notificationApi = useNotifications();

  const [amountNotReadNotifications, setAmountNotReadNotifications] = useState(0);

  const refreshAmountNotReadNotifications = useCallback(async () => {
    try {
      const data = await notificationApi.getAmountNotRead();
      console.log(`opgehaald: ${data}`);
      setAmountNotReadNotifications(data);
      console.log(`amount in context: ${amountNotReadNotifications}`);
    } catch (error) {
      console.log(error);
    }
  }, [notificationApi]);

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
