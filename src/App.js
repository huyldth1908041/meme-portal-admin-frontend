import 'antd/dist/antd.css';
import './App.scss';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { PrivateLayout } from './layouts';
import { Provider } from 'react-redux';
import store from './states';
import { LoginPage } from './pages/LoginPage';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from 'react-query';

function App() {
  const queryClient = new QueryClient();
  return (
    <>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <Router>
            <Switch>
              <Route exact path='/login' component={LoginPage} />
              <PrivateLayout />
            </Switch>
          </Router>
          <Toaster />
        </QueryClientProvider>
      </Provider>
    </>
  );
}

export default App;
