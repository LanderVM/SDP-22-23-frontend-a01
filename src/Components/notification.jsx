import { notification } from 'antd';
import { useEffect } from 'react';

export default function ToastNotification({
  title, message, icon, show, updatable, updatableKey, duration,
}) {
  let args;
  const key = updatableKey ?? 'updatable';
  if (updatable) {
    args = {
      key,
      message: title,
      description: message,
      icon,
      duration: duration ?? 3.5,
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
