import { useEffect, useState } from 'react';
import useNotifications from '../../api/notification';
import NotificationsDropdownTwo from './NotificationsDropdownTwo';

export default function NotificationsDropdown() {
  const [fiveMostRecentNotifications, setFiveMostRecentNotifications] = useState([]);

  const notificationsApi = useNotifications();

  useEffect(() => {
    const fetchFiveMostRecent = async () => {
      const data = await notificationsApi.getFiveMostRecent();
      console.log(data);
      setFiveMostRecentNotifications(data);
    };
    fetchFiveMostRecent();
  }, []);

  return (
    <NotificationsDropdownTwo notifications={fiveMostRecentNotifications} />
  );
}
