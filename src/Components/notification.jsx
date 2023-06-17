import { notification } from 'antd';
import { useEffect } from 'react';

export default function ToastNotification({
  title, message, icon,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: title,
      description: message,
      icon,
    });
  };

  useEffect(() => openNotification);
  return (
    <>
      { contextHolder }
      <p>aa</p>
    </>
  );
}
