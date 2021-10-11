import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse, Dropdown } from 'react-bootstrap';
import { privateRoute } from '../routes';
import { getLocalStorageObject } from '../utils';
import { PROFILE_STORAGE_KEY } from '../constants';


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
          <a className='sidebar-brand brand-logo' href='index.html'>
            <img src='/assets/images/logo.svg' alt='logo' />
          </a>
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
          <li className={this.isPathActive('/basic-ui') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
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
          <li className={this.isPathActive('/form-elements') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.formElementsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('formElementsMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-playlist-play' />
              </span>
              <span className='menu-title'><span>Form Elements</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.formElementsMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'><Link
                    className={this.isPathActive('/form-elements/basic-elements') ? 'nav-link active' : 'nav-link'}
                    to='/form-elements/basic-elements'><span>Basic Elements</span></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/tables') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.tablesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('tablesMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-table-large' />
              </span>
              <span className='menu-title'><span>Tables</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.tablesMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'><Link
                    className={this.isPathActive('/tables/basic-table') ? 'nav-link active' : 'nav-link'}
                    to='/tables/basic-table'><span>Basic Table</span></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/charts') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.chartsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('chartsMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-chart-bar' />
              </span>
              <span className='menu-title'><span>Charts</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.chartsMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'><Link
                    className={this.isPathActive('/charts/chart-js') ? 'nav-link active' : 'nav-link'}
                    to='/charts/chart-js'><span>Chart Js</span></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/icons') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.iconsMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('iconsMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-contacts' />
              </span>
              <span className='menu-title'><span>Icons</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.iconsMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-item'><Link
                    className={this.isPathActive('/icons/mdi') ? 'nav-link active' : 'nav-link'}
                    to='/icons/mdi'><span>Material</span></Link></li>
                </ul>
              </div>
            </Collapse>
          </li>
          <li className={this.isPathActive('/user-pages') ? 'nav-item menu-items active' : 'nav-item menu-items'}>
            <div className={this.state.userPagesMenuOpen ? 'nav-link menu-expanded' : 'nav-link'}
                 onClick={() => this.toggleMenuState('userPagesMenuOpen')} data-toggle='collapse'>
              <span className='menu-icon'>
                <i className='mdi mdi-security' />
              </span>
              <span className='menu-title'><span>User Pages</span></span>
              <i className='menu-arrow' />
            </div>
            <Collapse in={this.state.userPagesMenuOpen}>
              <div>
                <ul className='nav flex-column sub-menu'>
                  <li className='nav-itemk'><Link
                    className={this.isPathActive('/user-pages/login-1') ? 'nav-link active' : 'nav-link'}
                    to='/user-pages/login-1'><span>Login</span></Link></li>
                  <li className='nav-item'><Link
                    className={this.isPathActive('/user-pages/register-1') ? 'nav-link active' : 'nav-link'}
                    to='/user-pages/register-1'><span>Register</span></Link></li>
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