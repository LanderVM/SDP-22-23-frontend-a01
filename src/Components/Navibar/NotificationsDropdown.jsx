import { useEffect, useState } from 'react';
import useNotifications from '../../api/notification';
import NotificationsDropdownTwo from './NotificationsDropdownTwo';

export default function NotificationsDropdown() {
  const [fiveMostRecentNotifications, setFiveMostRecentNotifications] = useState([]);

  // const navigate = useNavigate();

  const notificationsApi = useNotifications();

  // let firstNavigation = '';
  // let firstMessage = '';

  useEffect(() => {
    const fetchFiveMostRecent = async () => {
      const data = await notificationsApi.getFiveMostRecent();
      console.log(data);
      setFiveMostRecentNotifications(data);
      // firstNavigation = `/orders/${fiveMostRecentNotifications[0].ORDER_order_id}`;
      // firstMessage = fiveMostRecentNotifications[0].message;
    };
    fetchFiveMostRecent();
  }, []);
  /*
  const handleFirstNotification = () => {
    navigate(`/orders/${fiveMostRecentNotifications[0].ORDER_order_id}`);
  }; */

  return (
    <NotificationsDropdownTwo notifications={fiveMostRecentNotifications} />
  );
}
