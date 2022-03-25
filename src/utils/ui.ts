import { notification } from 'antd';
import { NotificationPlacement } from 'antd/lib/notification';

export const showNotificationPopup = (
  notificationMessage: string,
  notificationDescription: string,
  placement: NotificationPlacement = 'bottomRight',
) =>
  notification.error({
    message: notificationMessage,
    description: notificationDescription,
    placement,
  });
