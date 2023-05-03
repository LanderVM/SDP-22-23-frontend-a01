import {
  Menu, Badge, Layout, Space,
} from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { NotificationButton, ShoppingCartButton } from './Buttons';
import AuthenticationButton from '../authentication/AuthenticationButton';

const { Header } = Layout;
// const { useBreakpoint } = Grid;

const color = '#EC4842';
const heightNB = '70px';

const headerStyle = {
  color: '#fff',
  height: heightNB,
  padding: '0 5%',
  backgroundColor: color,
};

const items = [
  {
    label: 'Products',
    key: 'products',
    to: '/products',
  },
  {
    label: 'Track & Trace',
    key: 'track',
    to: '/track',
  },
  {
    label: 'Notifications',
    key: 'notifications',
    to: '/notifications',
  },
];
function NavBar2() {
  const navigate = useNavigate();
  // const { lg } = useBreakpoint();

  const onClick = (e) => {
    navigate(`/${e.key}`);
  };

  const logo = '/images/Delaware-logo_white.png';
  // const mobileformat = lg ? 'flex' : 'none';

  return (
    <Header top style={headerStyle}>
      <div>
        <NavLink data-cy="navibar_logo" to="/home" style={{ float: 'left', paddingTop: '5px' }} replace>
          <img src={logo} height="60px" alt="Delaware logo" />
        </NavLink>
        <Space align="center" style={{ float: 'right', paddingTop: '25px', height: heightNB }}>
          <Badge color="geekblue" offset={[3, 5]}>
            <ShoppingCartButton />
          </Badge>
          <NotificationButton />
          <AuthenticationButton />
        </Space>
        <Menu
          onClick={onClick}
          style={{
            backgroundColor: color, color: 'white', fontSize: '25px', justifyContent: 'center', height: heightNB,
          }}
          mode="horizontal"
          items={items}
        />
      </div>
    </Header>
  );
}
export default NavBar2;
