import { NavLink } from 'react-router-dom';
import { CheckCircleOutlined, CheckCircleTwoTone } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import ToastNotification from '../../../Components/notification';

export default function SuccessfulOrder() {
  const [notificationVisible, setNotificationVisible] = useState(false);

  useEffect(() => {
    setNotificationVisible(true);
    setTimeout(() => setNotificationVisible(false), 200);
  }, []);

  const toastNotification = (
    <ToastNotification
      title="Order Placed"
      message={
                (
                  <>
                    You will receive an e-mail with your tracking details once the order has been processed.
                  </>
                )
            }
      icon={(
        <CheckCircleOutlined
          style={{
            color: '#ff4d4f',
          }}
        />
            )}
      show={notificationVisible}
      duration={20}
    />
  );

  return (
    <>
      {toastNotification}
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
    </>
  );
}
