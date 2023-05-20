import { Dropdown } from 'antd';
import { NavLink } from 'react-router-dom';
import { NotificationOutlined } from '@ant-design/icons';

export default function NotificationsDropdownTwo({ notifications }) {
  let items = [
    {
      label: (
        <div>
          {notifications.map((noti) => (
            <NavLink key={noti.ORDER_order_id} to={`orders/${noti.ORDER_order_id}`}>
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
