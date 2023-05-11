import { UserOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import './navibar.scss';

export default function ProfileButton() {
  return (
    <NavLink to="/profile" className="user-item delaware-dropdown-button">
      <UserOutlined twoToneColor="#FFFFFF" style={{ fontSize: '250%' }} />
      &nbsp;Company profile
    </NavLink>
  );
}
