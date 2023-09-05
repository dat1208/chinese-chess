import { toast } from 'react-toastify';

type NotificationType = 'info' | 'success' | 'warning' | 'error';

export const notify = (content: string, type: NotificationType): void => {
  if (!['info', 'success', 'warning', 'error'].includes(type)) {
    throw new Error('Invalid notification type.');
  }

  toast(content, {
    position: 'top-right',
    autoClose: 5000,
    theme: 'light',
    type,
  });
};
