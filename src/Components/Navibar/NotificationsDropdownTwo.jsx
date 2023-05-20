import { useContext } from 'react';
import { Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import { NotificationOutlined } from '@ant-design/icons';
import useNotifications from '../../api/notification';
import { NotificationsContext } from '../../Contexts/NotificationsContext';

export default function NotificationsDropdownTwo({ notifications }) {
  const notificationsApi = useNotifications();

  const { refreshAmountNotReadNotifications } = useContext(NotificationsContext);

  const hadleFirstNot = async () => {
    if (notifications[0].status === 'new' || notifications[0].status === 'unread') {
      const theNotification = {
        notification_id: notifications[0].notification_id,
        notification_date: notifications[0].notification_date,
        CUSTOMER_supplier_id: notifications[0].CUSTOMER_supplier_id,
        ORDER_order_id: notifications[0].ORDER_order_id,
        status: 'read',
        message: notifications[0].message,
      };
      const save = async () => {
        await notificationsApi.saveNotification(theNotification);
      };
      await save();
    }
    refreshAmountNotReadNotifications();
  };
  const hadleSecondNot = async () => {
    if (notifications[1].status === 'new' || notifications[1].status === 'unread') {
      const theNotification = {
        notification_id: notifications[1].notification_id,
        notification_date: notifications[1].notification_date,
        CUSTOMER_supplier_id: notifications[1].CUSTOMER_supplier_id,
        ORDER_order_id: notifications[1].ORDER_order_id,
        status: 'read',
        message: notifications[1].message,
      };
      const save = async () => {
        await notificationsApi.saveNotification(theNotification);
      };
      await save();
    }
    refreshAmountNotReadNotifications();
  };
  const hadleThirdNot = async () => {
    if (notifications[2].status === 'new' || notifications[2].status === 'unread') {
      const theNotification = {
        notification_id: notifications[2].notification_id,
        notification_date: notifications[2].notification_date,
        CUSTOMER_supplier_id: notifications[2].CUSTOMER_supplier_id,
        ORDER_order_id: notifications[2].ORDER_order_id,
        status: 'read',
        message: notifications[2].message,
      };
      const save = async () => {
        await notificationsApi.saveNotification(theNotification);
      };
      await save();
    }
    refreshAmountNotReadNotifications();
  };
  const hadleFourthNot = async () => {
    if (notifications[3].status === 'new' || notifications[3].status === 'unread') {
      const theNotification = {
        notification_id: notifications[3].notification_id,
        notification_date: notifications[3].notification_date,
        CUSTOMER_supplier_id: notifications[3].CUSTOMER_supplier_id,
        ORDER_order_id: notifications[3].ORDER_order_id,
        status: 'read',
        message: notifications[3].message,
      };
      const save = async () => {
        await notificationsApi.saveNotification(theNotification);
      };
      await save();
    }
    refreshAmountNotReadNotifications();
  };
  const hadleFifthhNot = async () => {
    if (notifications[4].status === 'new' || notifications[4].status === 'unread') {
      const theNotification = {
        notification_id: notifications[4].notification_id,
        notification_date: notifications[4].notification_date,
        CUSTOMER_supplier_id: notifications[4].CUSTOMER_supplier_id,
        ORDER_order_id: notifications[4].ORDER_order_id,
        status: 'read',
        message: notifications[4].message,
      };
      const save = async () => {
        await notificationsApi.saveNotification(theNotification);
      };
      await save();
    }
    refreshAmountNotReadNotifications();
  };
  const arrayOfHandlers = [hadleFirstNot, hadleSecondNot, hadleThirdNot, hadleFourthNot, hadleFifthhNot];
  let items = [
    {
      label: (
        <div>
          {notifications.map((noti, index) => (
            <NavLink key={noti.ORDER_order_id} to={`orders/${noti.ORDER_order_id}`} onClick={arrayOfHandlers[index]}>
              <p>
                <b>
                  Order
                  {' '}
                  {noti.ORDER_order_id}
                  :
                </b>
                {' '}
                {noti.message}
              </p>
            </NavLink>
          ))}
        </div>
      ),
      key: 0,
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div>
          <NavLink to="/notifications">
            <b>View all</b>
          </NavLink>
        </div>
      ),
      key: '5',
    },
  ];

  if (!notifications || notifications.length === 0) {
    items = [
      {
        label: (
          <div>
            No notifications
          </div>
        ),
      },
    ];
  }

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
    >
      <NotificationOutlined
        style={{
          fontSize: '250%',
          color: 'white',
        }}
        size={35}
      />
    </Dropdown>
  );
}
