import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import useAuthentication from '../../hooks/useAuthentication';
import { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { privateRoute } from '../../routes';

const LoginPage = () => {
  //demo purpose only
  const history = useHistory();
  const { login, isLoggedIn } = useAuthentication();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) history.push(privateRoute.home.path);
  }, [isLoggedIn, history]);

  const handleLogin = async () => {
    if (!username || !password) {
      toast.error('Please enter username and password');
      return;
    }
    if (password.length < 6) {
      toast.error('Password is too short');
      return;
    }
    try {
      setLoading(true);
      await login(username, password);
      history.push('/dashboard');
      toast.success('Login success');
    } catch (err) {
      const msg = err.message || 'wrong username or password';
      toast.error('Login failed '.concat(msg));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ paddingTop: 60 }}>
      <div className='d-flex align-items-center auth px-0'>
        <div className='row w-100 mx-0'>
          <div className='col-lg-4 mx-auto'>
            <div className='card text-left py-5 px-4 px-sm-5'>
              <div className='brand-logo'>
                <img src='assets/images/logo.svg' alt='logo' />
              </div>
              <h4>Hello! let's get started</h4>
              <h6 className='font-weight-light'>Sign in to continue.</h6>
              <Form className='pt-3' onSubmit={() => handleLogin()}>
                <Form.Group className='d-flex search-field'>
                  <Form.Control
                    type='email'
                    placeholder='Username'
                    size='lg'
                    className='h-auto'
                    onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className='d-flex search-field'>
                  <Form.Control
                    type='password'
                    placeholder='Password'
                    size='lg'
                    className='h-auto'
                    onChange={e => setPassword(e.target.value)} />
                </Form.Group>
                <div className='mt-3'>
                  <Button
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={() => handleLogin()}
                    disabled={loading}>
                    {loading ? 'SIGNING IN' : 'SIGN IN'}
                  </Button>
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
