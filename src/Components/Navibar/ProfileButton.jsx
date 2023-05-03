import { UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';

export default function ProfileButton() {
  const navigate = useNavigate();

  const goToProfilePage = () => {
    navigate('/profilePage');
  };

  return (
    <div className="delaware-dropdown-button" onClick={goToProfilePage}>
      <UserOutlined twoToneColor="#FFFFFF" style={{ fontSize: '250%' }} />
      &nbsp;Company profile
    </div>
  );
}
