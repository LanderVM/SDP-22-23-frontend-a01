import { useContext } from 'react';
import { Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import { NotificationOutlined } from '@ant-design/icons';
import useNotifications from '../../api/notification';
import { NotificationsContext } from '../../Contexts/NotificationsContext';

export default function NotificationsDropdownTwo({ notifications }) {
  const notificationsApi = useNotifications();

  const { refreshAmountNotReadNotifications } = useContext(NotificationsContext);

  const arrayOfHandlers = [0, 0, 0, 0, 0];
  arrayOfHandlers.forEach((el, index) => {
    const handleNot = async () => {
      if (notifications[index].status === 'new' || notifications[index].status === 'unread') {
        const theNotification = {
          notification_id: notifications[index].notification_id,
          notification_date: notifications[index].notification_date,
          CUSTOMER_supplier_id: notifications[index].CUSTOMER_supplier_id,
          ORDER_order_id: notifications[index].ORDER_order_id,
          status: 'read',
          message: notifications[index].message,
        };
        const save = async () => {
          await notificationsApi.saveNotification(theNotification);
        };
        await save();
      }
      refreshAmountNotReadNotifications();
    };
    arrayOfHandlers[index] = handleNot;
  });
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
