import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react';
import useNotifications from '../../api/notification';
import NotificationsDropdownTwo from './NotificationsDropdownTwo';

export default function NotificationsDropdown() {
  const [fiveMostRecentNotifications, setFiveMostRecentNotifications] = useState([]);

  const { isAuthenticated } = useAuth0();

  const notificationsApi = useNotifications();

  useEffect(() => {
    const fetchFiveMostRecent = async () => {
      const data = await notificationsApi.getFiveMostRecent();
      console.log(data);
      setFiveMostRecentNotifications(data);
    };
    if (isAuthenticated) {
      fetchFiveMostRecent();
    }
  }, [isAuthenticated]);

  return (
    <NotificationsDropdownTwo notifications={fiveMostRecentNotifications} />
  );
}
