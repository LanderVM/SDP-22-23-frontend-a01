import React from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';

export default function SideMenu({ show, handleCloseFunction }) {
  return (
    <Offcanvas show={show} onHide={handleCloseFunction}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Delaware</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        Some text as placeholder
      </Offcanvas.Body>
    </Offcanvas>
  );
}
