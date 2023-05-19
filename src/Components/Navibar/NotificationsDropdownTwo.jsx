import { Dropdown } from "antd";
import { NavLink } from "react-router-dom";

export default function NotificationsDropdownTwo({ notifications }) {
  const items = [
    {
      label: (
        <div>
          <NavLink to={firstNavigation}>
            <p>{firstMessage}</p>
          </NavLink>
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
            View all
          </NavLink>
        </div>
      ),
      key: '5',
    },
  ];

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

