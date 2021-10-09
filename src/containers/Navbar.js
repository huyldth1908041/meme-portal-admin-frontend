import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuthentication from '../hooks/useAuthentication';


const Navbar = () => {
  const { user, logout } = useAuthentication();
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
          <Dropdown alignRight as='li' className='nav-item d-none d-lg-block'>
            <Dropdown.Toggle className='nav-link btn btn-success create-new-button no-caret'>
              + <span>Create New Project</span>
            </Dropdown.Toggle>

            <Dropdown.Menu className='navbar-dropdown preview-list create-new-dropdown-menu'>
              <h6 className='p-3 mb-0'><span>Projects</span></h6>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => evt.preventDefault()} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-file-outline text-primary'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject ellipsis mb-1'><span>Software Development</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => evt.preventDefault()} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-web text-info'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject ellipsis mb-1'><span>UI Development</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => evt.preventDefault()} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-layers text-danger'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject ellipsis mb-1'><span>Software Testing</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <p className='p-3 mb-0 text-center'><span>See all projects</span></p>
            </Dropdown.Menu>
          </Dropdown>
          <li className='nav-item d-none d-lg-block'>
            <a className='nav-link' href='!#' onClick={event => event.preventDefault()}>
              <i className='mdi mdi-view-grid'></i>
            </a>
          </li>
          <Dropdown alignRight as='li' className='nav-item border-left'>
            <Dropdown.Toggle as='a' className='nav-link count-indicator cursor-pointer'>
              <i className='mdi mdi-email'></i>
              <span className='count bg-success'></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='navbar-dropdown preview-list'>
              <h6 className='p-3 mb-0'><span>Messages</span></h6>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => evt.preventDefault()} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <img src='/assets/images/face1.jpg' alt='profile'
                         className='rounded-circle profile-pic' />
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject ellipsis mb-1'><span>Mark send you a message</span></p>
                  <p className='text-muted mb-0'> 1 <span>Minutes ago</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => evt.preventDefault()} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <img src='/assets/images/face1.jpg' alt='profile'
                         className='rounded-circle profile-pic' />
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject ellipsis mb-1'><span>Cregh send you a message</span></p>
                  <p className='text-muted mb-0'> 15 <span>Minutes ago</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item href='!#' onClick={evt => evt.preventDefault()} className='preview-item'>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <img src='/assets/images/face1.jpg' alt='profile'
                         className='rounded-circle profile-pic' />
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject ellipsis mb-1'><span>Profile picture updated</span></p>
                  <p className='text-muted mb-0'> 18 <span>Minutes ago</span></p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <p className='p-3 mb-0 text-center'>4 <span>new messages</span></p>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown alignRight as='li' className='nav-item border-left'>
            <Dropdown.Toggle as='a' className='nav-link count-indicator cursor-pointer'>
              <i className='mdi mdi-bell'></i>
              <span className='count bg-danger'></span>
            </Dropdown.Toggle>
            <Dropdown.Menu className='dropdown-menu navbar-dropdown preview-list'>
              <h6 className='p-3 mb-0'><span>Notifications</span></h6>
              <Dropdown.Divider />
              <Dropdown.Item className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-calendar text-success'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <p className='preview-subject mb-1'><span>Event today</span></p>
                  <p className='text-muted ellipsis mb-0'>
                    <span>Just a reminder that you have an event today</span>
                  </p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-settings text-danger'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <h6 className='preview-subject mb-1'><span>Settings</span></h6>
                  <p className='text-muted ellipsis mb-0'>
                    <span>Update dashboard</span>
                  </p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                <div className='preview-thumbnail'>
                  <div className='preview-icon bg-dark rounded-circle'>
                    <i className='mdi mdi-link-variant text-warning'></i>
                  </div>
                </div>
                <div className='preview-item-content'>
                  <h6 className='preview-subject mb-1'><span>Launch Admin</span></h6>
                  <p className='text-muted ellipsis mb-0'>
                    <span>New admin wow</span>!
                  </p>
                </div>
              </Dropdown.Item>
              <Dropdown.Divider />
              <p className='p-3 mb-0 text-center'><span>See all notifications</span></p>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown alignRight as='li' className='nav-item'>
            <Dropdown.Toggle as='a' className='nav-link cursor-pointer no-caret'>
              <div className='navbar-profile'>
                <img className='img-xs rounded-circle' src='/assets/images/face1.jpg' alt='profile' />
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
                logout()
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
