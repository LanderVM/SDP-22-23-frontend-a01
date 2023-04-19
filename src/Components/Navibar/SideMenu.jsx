import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import './sidemenu.css';
import { MdOutlineManageAccounts, MdOutlineStorefront } from 'react-icons/md';
import { TbMapSearch } from 'react-icons/tb';
import { FiPackage } from 'react-icons/fi';
import { useAuth0 } from '@auth0/auth0-react';
import LoginButton from '../authentication/LoginButton';
import LogoutButton from '../authentication/LogoutButton';

export default function SideMenu({ show, handleCloseFunction }) {
  const {
    isAuthenticated,
    user,
  } = useAuth0();

  return (
    <Offcanvas show={show} onHide={handleCloseFunction}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>
          <img src="/images/LogoDelaware.png" alt="Delaware logo" />
        </Offcanvas.Title>
      </Offcanvas.Header>
      <hr className="hr m-1" />
      <Offcanvas.Body>
        <Nav.Link
          className="d-flex align-items-center"
          as={NavLink}
          to="/products"
          replace
        >
          <MdOutlineStorefront size={60} className="me-1" />
          Browse Products
        </Nav.Link>
        <hr className="hr my-4" />
        <Nav.Link
          className="d-flex align-items-center"
          as={NavLink}
          to="/tracking"
          replace
        >
          <TbMapSearch size={60} className="me-1" />
          Track Order
        </Nav.Link>
        <hr className="hr my-4" />
        <Nav.Link
          className="d-flex align-items-center"
          as={NavLink}
          to="/orders"
          replace
        >
          <FiPackage size={60} className="me-1" />
          View Orders
        </Nav.Link>
        <hr className="hr my-4" />
        {!isAuthenticated
          ? (
            <LoginButton iconSize={60} bootStrapIconStyling="me-1" />
          )
          : (
            <>
              <Nav.Link
                className="d-flex align-items-center"
                as={NavLink}
                to={`/profile/${user.email}`}
                replace
              >
                <MdOutlineManageAccounts size={60} className="me-1" />
                Manage Account
              </Nav.Link>
              <hr className="hr my-4" />
              <LogoutButton />
            </>
          )}
      </Offcanvas.Body>
    </Offcanvas>
  );
}
