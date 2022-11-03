import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { clearMessage } from '../reducers/notificationSlice';

import styles from './Notification.module.css';

const Notification = () => {
  const notification = useSelector((state) => state.notification);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearMessage());
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [notification.message]);

  if (notification.message === '') {
    return null;
  }

  return (
    <div
      id="notification-message"
      className={
        notification.isError
          ? [styles.message, styles.error].join(' ')
          : styles.message
      }
    >
      {notification.message}
    </div>
  );
};

export default Notification;
