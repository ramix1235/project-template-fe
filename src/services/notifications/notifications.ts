import { notifications, NotificationData } from '@mantine/notifications';

import { getErrorText } from '#/services/errors';

import classes from './notifications.module.scss';

export const showErrorNotification = (error: unknown, notificationData?: NotificationData) => {
  const mergedNotificationData: NotificationData = {
    message: getErrorText(error),
    classNames: classes,
  };

  if (notificationData?.classNames) {
    mergedNotificationData.classNames = { ...classes, ...notificationData.classNames };
  }

  return notifications.show({
    color: 'red',
    ...mergedNotificationData,
  });
};

export const showSuccessNotification = (notificationData: NotificationData) => {
  const { classNames, ...rest } = notificationData;

  return notifications.show({
    color: 'green',
    classNames: classNames ? { ...classes, ...classNames } : classes,
    ...rest,
  });
};
