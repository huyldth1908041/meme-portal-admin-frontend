import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { privateRoute } from '../routes';
import { getLocalStorageObject } from '../utils';
import { PROFILE_STORAGE_KEY } from '../constants';
import { Image } from 'antd';


class Sidebar extends Component {
  user = getLocalStorageObject(PROFILE_STORAGE_KEY);
  state = {};

  toggleMenuState(menuState) {
    if (this.state[menuState]) {
      this.setState({ [menuState]: false });
    } else if (Object.keys(this.state).length === 0) {
      this.setState({ [menuState]: true });
    } else {
      Object.keys(this.state).forEach(i => {
        this.setState({ [i]: false });
      });
      this.setState({ [menuState]: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    document.querySelector('#sidebar').classList.remove('active');
    Object.keys(this.state).forEach(i => {
      this.setState({ [i]: false });
    });

    const dropdownPaths = [
      { path: '/apps', state: 'appsMenuOpen' },
      { path: '/basic-ui', state: 'basicUiMenuOpen' },
      { path: '/form-elements', state: 'formElementsMenuOpen' },
      { path: '/tables', state: 'tablesMenuOpen' },
      { path: '/icons', state: 'iconsMenuOpen' },
      { path: '/charts', state: 'chartsMenuOpen' },
      { path: '/user-pages', state: 'userPagesMenuOpen' },
      { path: '/error-pages', state: 'errorPagesMenuOpen' },
    ];

    dropdownPaths.forEach((obj => {
      if (this.isPathActive(obj.path)) {
        this.setState({ [obj.state]: true });
      }
    }));

  }

  render() {
    return (
      <nav className='sidebar sidebar-offcanvas' id='sidebar'>
        <div className='sidebar-brand-wrapper d-none d-lg-flex align-items-center justify-content-center fixed-top'>
          <Link style={{ display: 'flex', alignItems: 'center', color: '#fff' }} to='/'>
            <Image src='/assets/images/nobg-logo.png' alt='logo' width={50} height={50} preview={false} />
            HÀI CODE
          </Link>
          <a className='sidebar-brand brand-logo-mini' href='index.html'>
            <img src='/assets/images/logo-mini.svg' alt='logo' />
          </a>
        </div>
        <ul className='nav'>
          <li className='nav-item profile'>
            <div className='profile-desc'>
              <div className='profile-pic'>
                <div className='count-indicator'>
                  <img className='img-xs rounded-circle '
                       src={this.user && (this.user.avatar || '/assets/images/default-avatar.jpg')}
                       alt='profile' />
                  <span className='count bg-success' />
                </div>
                <div className='profile-name'>
                  <h5 className='mb-0 font-weight-normal'>
                    <span>{this.user && this.user.fullName}</span>
                  </h5>
                  <span><span>Gold Member</span></span>
                </div>
              </div>
              <Dropdown alignRight>
                <Dropdown.Toggle as='a' className='cursor-pointer no-caret'>
                  <i className='mdi mdi-dots-vertical' />
                </Dropdown.Toggle>
                <Dropdown.Menu className='sidebar-dropdown preview-list'>
                  <a href='!#' className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                    <div className='preview-thumbnail'>
                      <div className='preview-icon bg-dark rounded-circle'>
                        <i className='mdi mdi-settings text-primary' />
                      </div>
                    </div>
                    <div className='preview-item-content'>
                      <p className='preview-subject ellipsis mb-1 text-small'><span>Account settings</span></p>
                    </div>
                  </a>
                  <div className='dropdown-divider' />
                  <a href='!#' className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                    <div className='preview-thumbnail'>
                      <div className='preview-icon bg-dark rounded-circle'>
                        <i className='mdi mdi-onepassword  text-info' />
                      </div>
                    </div>
                    <div className='preview-item-content'>
                      <p className='preview-subject ellipsis mb-1 text-small'><span>Change Password</span></p>
                    </div>
                  </a>
                  <div className='dropdown-divider' />
                  <a href='!#' className='dropdown-item preview-item' onClick={evt => evt.preventDefault()}>
                    <div className='preview-thumbnail'>
                      <div className='preview-icon bg-dark rounded-circle'>
                        <i className='mdi mdi-calendar-today text-success' />
                      </div>
                    </div>
                    <div className='preview-item-content'>
                      <p className='preview-subject ellipsis mb-1 text-small'><span>To-do list</span></p>
                    </div>
                  </a>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </li>
          <li className='nav-item nav-category'>
            <span className='nav-link'><span>Navigation</span></span>
          </li>
          <li className={this.isPathActive('/dashboard') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <Link className='nav-link' to={privateRoute.dashboard.path}>
              <span className='menu-icon'><i className='mdi mdi-speedometer' /></span>
              <span className='menu-title'><span>Dashboard</span></span>
            </Link>
          </li>
          <li className={this.isPathActive('/post') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.basicUiMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('basicUiMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-laptop' />
              </span>
              <span className='menu-title'><span>Post Management</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.basicUiMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    <Link
                      className={this.isPathActive(privateRoute.verifyPost.path) ? 'nav-link active' : 'nav-link'}
                      to={privateRoute.verifyPost.path}>
                      <span>Verify posts</span>
                    </Link>
                  </li>
                  <li className='nav-item'><Link
                    className={this.isPathActive(privateRoute.createPost.path) ? 'nav-link active' : 'nav-link'}
                    to={privateRoute.createPost.path}><span>Create Post</span></Link></li>
                  <li className='nav-item'><Link
                    className={this.isPathActive(privateRoute.listPosts.path) ? 'nav-link active' : 'nav-link'}
                    to={privateRoute.listPosts.path}><span>All Post</span></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/user') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('formElementsMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-playlist-play' />
              </span>
              <span className='menu-title'><span>Users managements</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'>
                    <Link
                      className={this.isPathActive(privateRoute.listUsers.path) ? 'nav-link active' : 'nav-link'}
                      to={privateRoute.listUsers.path}>
                      <span>All users</span>
                    </Link>
                  </li>

                  <li className='nav-item'>
                    <Link
                      className={this.isPathActive(privateRoute.registerUser.path) ? 'nav-link active' : 'nav-link'}
                      to={privateRoute.registerUser.path}>
                      <span>Register new user</span>
                    </Link>
                  </li>

                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/report') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('tablesMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-table-large' />
              </span>
              <span className='menu-title'><span>Reports Management</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'><
                    Link
                    className={this.isPathActive(privateRoute.pendingReports.path) ? 'nav-link active' : 'nav-link'}
                    to={privateRoute.pendingReports.path}
                  >
                    <span>Pending Reports</span>
                  </Link>
                  </li>
                  <li className='nav-item'><
                    Link
                    className={this.isPathActive(privateRoute.allReports.path) ? 'nav-link active' : 'nav-link'}
                    to={privateRoute.allReports.path}
                  >
                    <span>All Reports</span>
                  </Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/ads') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-chart-bar' />
              </span>
              <span className='menu-title'><span>Advertisements</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'><Link
                    className={this.isPathActive(privateRoute.verifyAdvertisements.path) ? 'nav-link active' : 'nav-link'}
                    to={privateRoute.verifyAdvertisements.path}><span>Verify Ads</span></Link></li>
                  <li className='nav-item'><Link
                    className={this.isPathActive(privateRoute.allAdvertisements.path) ? 'nav-link active' : 'nav-link'}
                    to={privateRoute.allAdvertisements.path}><span>All Ads</span></Link></li>

                </ul>
              </div>
            </Collapse>
          </li>
        </ul>
      </nav>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }

  componentDidMount() {
    this.onRouteChanged();
    // add class 'hover-open' to sidebar navitem while hover in sidebar-icon-only menu
    const body = document.querySelector('body');
    document.querySelectorAll('.sidebar .nav-item').forEach((el) => {

      el.addEventListener('mouseover', function() {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.add('hover-open');
        }
      });
      el.addEventListener('mouseout', function() {
        if (body.classList.contains('sidebar-icon-only')) {
          el.classList.remove('hover-open');
        }
      });
    });
  }

}

export default withRouter(Sidebar);