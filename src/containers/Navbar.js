import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';
import Fire from '../services/fire';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { NotificationItem } from '../components';


const Navbar = () => {
  const { user, logout } = useAuthentication();
  const notificationRef = Fire.create.fireStore.collection(user.username);
  const query = notificationRef.orderBy('createdAt', 'desc').limit(5);
  const [notifications = []] = useCollectionData(query, { idField: 'id' });
  const activeNotifications = notifications.filter(notification => notification.status > 0);
  const handleNotificationClicked = async (e, item) => {
    await notificationRef.doc(item.id).update({ ...item, status: -1 });
  };
  const toggleOffcanvas = () => {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  };

  return (
    <nav className='navbar p-0 fixed-top d-flex flex-row'>
      <div className='navbar-brand-wrapper d-flex d-lg-none align-items-center justify-content-center'>
        <Link className='navbar-brand brand-logo-mini' to='/'>
          <img src='/assets/images/logo-mini.svg' alt='logo' />
        </Link>
      </div>
      <div className='navbar-menu-wrapper flex-grow d-flex align-items-stretch'>
        <button className='navbar-toggler align-self-center' type='button'
                onClick={() => document.body.classList.toggle('sidebar-icon-only')}>
          <span className='mdi mdi-menu'></span>
        </button>
        <ul className='navbar-nav w-100'>
          <li className='nav-item w-100'>
            <form className='nav-link mt-2 mt-md-0 d-none d-lg-flex search'>
              <input type='text' className='form-control' placeholder='Search products' />
            </form>
          </li>
        </ul>
        <ul className='navbar-nav navbar-nav-right'>
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
          <Dropdown alignRight as='li' className='nav-item'>
            <Dropdown.Toggle as='a' className='nav-link cursor-pointer no-caret'>
              <div className='navbar-profile'>
                <img className='img-xs rounded-circle'
                     src={user && (user.avatar || '/assets/images/default-avatar.jpg')}
                     alt='profile' />
                <p className='mb-0 d-none d-sm-block navbar-profile-name'><span>{user && user.fullName}</span></p>
                <i className='mdi mdi-menu-down d-none d-sm-block'></i>
              </div>
            </Dropdown.Toggle>

            <Dropdown.Menu className='navbar-dropdown preview-list navbar-profile-dropdown-menu'>
              <h6 className='p-3 mb-0'><span>Profile</span></h6>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => evt.preventDefault()} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-settings text-success'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject mb-1'><span>Settings</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => {
                evt.preventDefault();
                logout();
              }} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-logout text-danger'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject mb-1'><span>Log Out</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <p className='p-3 mb-0 text-center'><span>Advanced settings</span></p>
            </Dropdown.Menu>
          </Dropdown>
        </ul>
        <button className='navbar-toggler navbar-toggler-right d-lg-none align-self-center' type='button'
                onClick={() => toggleOffcanvas()}>
          <span className='mdi mdi-format-line-spacing'></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
