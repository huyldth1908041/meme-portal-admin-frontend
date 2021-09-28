import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateLayout } from './layouts';
import { Provider } from 'react-redux';
import store from './states';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegisterPage} />
          <PrivateLayout />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
