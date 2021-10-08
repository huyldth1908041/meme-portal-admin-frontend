import { useProfileHandler } from '../../states/profile';
import { useHistory } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { privateRoute } from '../../routes';

const LoginPage = () => {
  //demo purpose only
  const history = useHistory();
  const { onLogin } = useProfileHandler();
  const handleLogin = () => {
    onLogin();
    history.push(privateRoute.home.path);
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
              <Form className='pt-3'>
                <Form.Group className='d-flex search-field'>
                  <Form.Control type='email' placeholder='Username' size='lg' className='h-auto' />
                </Form.Group>
                <Form.Group className='d-flex search-field'>
                  <Form.Control type='password' placeholder='Password' size='lg' className='h-auto' />
                </Form.Group>
                <div className='mt-3'>
                  <Button
                    className='btn btn-block btn-primary btn-lg font-weight-medium auth-form-btn'
                    onClick={() => handleLogin()}>
                    SIGN IN
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
