import { AppFooter, AppNavbar } from '../containers';
import { privateRoute } from '../routes';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useProfileState } from '../states/profile';
import Sidebar from '../containers/Sidebar';


function PrivateRoute({ component: Component, authed, requiredLogin, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => !requiredLogin || authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  );
}

const PrivateLayout = () => {
  const { isLoggedIn } = useProfileState();
  return (
    <div className='container-scroller'>
      <Sidebar />
      <div className='container-fluid page-body-wrapper'>
        <AppNavbar />
        <div className='main-panel'>
          <div className='content-wrapper'>
            <Switch>
              {Object.values(privateRoute)
                //.filter(({ requiredLogin }) => !requiredLogin || isLoggedIn)
                .map(({ path, component, requiredLogin }) => (
                  // <Route exact key={path} path={path} component={component} />
                  <PrivateRoute
                    exact
                    key={path}
                    authed={isLoggedIn}
                    requiredLogin={requiredLogin}
                    path={path}
                    component={component} />
                ))}
              <Redirect from='/' to={privateRoute.home.path} />
            </Switch>
          </div>
          <AppFooter />
        </div>
      </div>
    </div>
  );
};

export default PrivateLayout;