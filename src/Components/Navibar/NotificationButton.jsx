import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import './button.css';
import { MdChatBubbleOutline } from 'react-icons/md';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../authentication/LoginButton';

export default function NotificationButton({ iconSize }) {
  const {
    isAuthenticated,
  } = useAuth0();

  // TODO veranderen naar onClick toont notifications popup
  return (
    <Nav.Link
      style={{ display: 'flex' }}
      className="p-1 align-items-center navibar-button"
      as={NavLink}
      to="/notifications"
      replace
    >
      {!isAuthenticated
        ? (
          <LoginButton bootstrapTextStyling="navibar-button m-0 mb-1 p-0" asClass="h2" iconSize={45} bootStrapIconStyling="p-1 me-1" />
        )
        : (
          <>
            {/* TODO if hasNotifications use MdChatBubble, else use MdChatBubbleOutline */}
            <MdChatBubbleOutline size={iconSize} className="p-1 me-1" />
            <Navbar.Text className="navibar-button m-0 mb-1 p-0" as="h2">
              Notifications
            </Navbar.Text>
          </>
        )}
    </Nav.Link>
  );
}
