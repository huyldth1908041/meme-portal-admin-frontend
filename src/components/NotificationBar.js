import { Dropdown } from 'react-bootstrap';
import { NotificationItem } from './index';
import React from 'react';
import Fire from '../services/fire';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import useAuthentication from '../hooks/useAuthentication';

const NotificationBar = () => {
  const { user } = useAuthentication();
  const notificationRef = Fire.create.fireStore.collection(user.username);
  const query = notificationRef.orderBy('createdAt', 'desc').limit(5);
  const [notifications = []] = useCollectionData(query, { idField: 'id' });
  const activeNotifications = notifications.filter(notification => notification.status > 0);
  const handleNotificationClicked = async (e, item) => {
    await notificationRef.doc(item.id).update({ ...item, status: -1 });
  };
  return (
    <Dropdown alignRight as='li' className='nav-item border-left'>
      <Dropdown.Toggle as='a' className='nav-link count-indicator cursor-pointer'>
        <i className='mdi mdi-bell' />
        {activeNotifications.length > 0 && (<span className='count bg-danger'></span>)}
      </Dropdown.Toggle>
      <Dropdown.Menu className='dropdown-menu navbar-dropdown preview-list'>
        <h6 className='p-3 mb-0'><span style={{ color: '#fff' }}>Notifications</span></h6>
        <Dropdown.Divider />
        {
          notifications.map(item => (
            <NotificationItem key={item.id} item={item} onNotificationClick={handleNotificationClicked} />
          ))
        }
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationBar;