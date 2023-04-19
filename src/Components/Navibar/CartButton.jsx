import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';
import Navbar from 'react-bootstrap/Navbar';
import './button.css';
import { BsCart } from 'react-icons/bs';

export default function CartButton({ iconSize }) {
  return (
    <Nav.Link
      style={{ display: 'flex' }}
      className="p-1 navibar-button ms-3 align-items-center"
      as={NavLink}
      to="/shoppingCart"
      replace
    >
      <BsCart size={iconSize} className="p-1 me-1 navibar-button" />
      <Navbar.Text className="navibar-button m-0 mb-1 p-0" as="h2">Cart</Navbar.Text>
    </Nav.Link>
  );
}
