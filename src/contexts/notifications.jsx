import {
  createContext, useMemo, useState,
} from 'react';
import useNotifications from '../api/notification-service';

export const Notifications = createContext();

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
    <Notifications.Provider value={value}>
      {children}
    </Notifications.Provider>
  );
}
