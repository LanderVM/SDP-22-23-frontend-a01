import { notification } from 'antd';
import { useEffect } from 'react';

const key = 'updatable';
export default function ToastNotification({
  title, message, icon, show, updatable,
}) {
  let args;
  if (updatable) {
    args = {
      key,
      message: title,
      description: message,
      icon,
    };
  } else {
    args = {
      message: title,
      description: message,
      icon,
    };
  }

  const [api, contextHolder] = notification.useNotification();
  const openNotification = () => {
    api.open(args);
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
