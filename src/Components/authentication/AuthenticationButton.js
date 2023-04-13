import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from './LoginButton';
import LogoutButton from './LogoutButton';
import { Link } from 'react-router-dom';

export default function AuthenticationButton() {
  const {
    isAuthenticated,
    user,
  } = useAuth0(); 

  if (isAuthenticated) { 
    const { name } = user;
    return (
      <div className="container ">
        <div className='d-inline-flex align-items-center'>
          <div className="text-white p-2">
            Welcome, {name}
          </div>
          <div className='p-2'>
            <LogoutButton />
          </div>
          <div className='p-2'>
            <Link to={"/profile"}><img src="/images/user.png" alt="profile icon" width="60px"/></Link>
          </div>
          <div className='p-2'>
            <Link to={"/profile"}><img src='/images/shopping-cart.png' alt='shopping card' width="60px"></img></Link>
          </div>
        </div>
        
      </div>
    );
  }

  return <LoginButton />;
}
