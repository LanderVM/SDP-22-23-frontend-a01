import { NavLink } from 'react-router-dom';
import { CheckCircleTwoTone } from '@ant-design/icons';
import React from 'react';

export default function SuccessfulOrder() {
  return (
    <div style={{ textAlign: 'center', margin: '200px 0', fontSize: '36px' }}>
      <div>
        <CheckCircleTwoTone twoToneColor="green" style={{ fontSize: '64px' }} />
      </div>
      <div style={{ padding: '50px 0' }}>
        Successfully completed order
      </div>
      <div>
        <NavLink to="/orders" style={{ color: 'blue' }}>
          Go to orders
        </NavLink>
      </div>
    </div>
  );
}
