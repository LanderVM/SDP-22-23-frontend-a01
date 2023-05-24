import { useContext } from 'react';
import { Row, Col } from 'antd';
import { useNavigate } from 'react-router';
import useNotifications from '../../../api/notification-service';
import { Notifications } from '../../../contexts/notifications';

export default function SingleNotification({ notification }) {
  const navigate = useNavigate();
  const notificationsApi = useNotifications();

  const { refreshAmountNotReadNotifications } = useContext(Notifications);

  const handleClickNotification = async (event) => {
    event.stopPropagation();
    event.preventDefault();
    if (notification.status === 'new' || notification.status === 'unread') {
      const theNotification = {
        notification_id: notification.notification_id,
        notification_date: notification.notification_date,
        CUSTOMER_supplier_id: notification.CUSTOMER_supplier_id,
        ORDER_order_id: notification.ORDER_order_id,
        status: 'read',
        message: notification.message,
      };
      const save = async () => {
        await notificationsApi.saveNotification(theNotification);
      };
      await save();
    }
    refreshAmountNotReadNotifications();
    navigate(`/orders/${notification.ORDER_order_id}`);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Row onClick={handleClickNotification} className="notCols" data-cy="notification">
        <Col span={6}>
          <p data-cy="notificationDate">{notification.notification_date.split('T')[0]}</p>
        </Col>
        <Col span={6}>
          <p data-cy="notificationMessage">{notification.message}</p>
        </Col>
        <Col span={6}>
          <p data-cy="notificationStatus">{notification.status}</p>
        </Col>
        <Col span={6}>
          <p data-cy="notificationOrderId">{notification.order_id}</p>
        </Col>
      </Row>
    </div>
  );
}
