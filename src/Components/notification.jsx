import { notification } from 'antd';
import { useEffect } from 'react';

export default function ToastNotification({
  title, message, icon, show,
}) {
  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open({
      message: title,
      description: message,
      icon,
    });
  };

  useEffect(() => {
    if (show === true) openNotification();
  });
  return (
    <div>
      { contextHolder }
    </div>
  );
}
