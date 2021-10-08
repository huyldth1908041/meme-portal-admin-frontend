import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateLayout } from './layouts';
import { Provider } from 'react-redux';
import store from './states';
import { LoginPage } from './pages/LoginPage';

function App() {
  return (
    <>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route exact path='/login' component={LoginPage} />
            <PrivateLayout />
          </Switch>
        </Router>
      </Provider>
    </>
  );
}

export default App;
