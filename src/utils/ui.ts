import { notification } from 'antd';

export const showNotificationPopup = (
  notificationMessage: string,
  notificationDescription: string,
) =>
  notification.error({
    message: notificationMessage,
    description: notificationDescription,
  });
