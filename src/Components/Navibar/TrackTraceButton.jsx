import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom';
import './navibar.css';

export default function TrackTraceButton() {
  return (
    <NavLink to="/track" className="user-item delaware-dropdown-button">
      <HomeOutlined style={{ fontSize: '250%' }} />
      &nbsp;Track & Trace
    </NavLink>
  );
}
