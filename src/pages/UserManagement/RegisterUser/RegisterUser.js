import { PageContainer } from '../../../containers';
import { PageTitle } from '../../../components';
import styled from 'styled-components';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import memeServices from '../../../services/memeServices';

const Wrapper = styled.div`
  width: 60%;
  padding: 20px;
  margin: 0 auto;
`;
const StyledLabel = styled.div`
  color: #fff;
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 15px;
  margin-top: 10px;
`;
const RegisterUser = () => {
  const [form] = Form.useForm();
  const [isExec, setIsExec] = useState(false);
  const handleFinish = async (values) => {
    const registerPromise = new Promise(async (resolve, reject) => {
      try {
        setIsExec(true);
        const res = await memeServices.registerUser({
          phone: values.phone,
          fullName: values.fullName,
          username: values.username,
          password: values.password,
        });
        form.resetFields();
        resolve(res);
      } catch (err) {
        console.error(err);
        reject(err);
      } finally {
        setIsExec(false);
      }
    });

    await toast.promise(registerPromise, {
      success: 'Register user success',
      loading: 'saving...',
      error: (err) => `register failed ${err.message}`,
    });
  };
  const handleFinishFailed = () => {
    toast.error('Please check form value then try again');
  };
  return (
    <PageContainer>
      <PageTitle>Register new User</PageTitle>
      <Wrapper>
        <Form
          name='register'
          form={form}
          onFinish={handleFinish}
          onFinishFailed={handleFinishFailed}
        >
          <StyledLabel>Email</StyledLabel>
          <Form.Item
            name='username'
            rules={[
              { required: true, message: 'email is required' },
              {
                pattern: '^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$',
                message: 'invalid email format',
              },
            ]}
          >
            <Input type='text' placeholder='Username' />
          </Form.Item>

          <StyledLabel>Phone number</StyledLabel>
          <Form.Item
            name='phone'
            rules={[
              { required: true, message: 'phone is required' },
              { pattern: '^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\\s\\./0-9]*$', message: 'phone number format invalid' },
            ]}
          >
            <Input type='text' placeholder='phone' />
          </Form.Item>

          <StyledLabel>Full name</StyledLabel>
          <Form.Item
            name='fullName'
            rules={[{ required: true, message: 'full name is required' }]}
          >
            <Input type='text' placeholder='full name' />
          </Form.Item>
          <StyledLabel>Password</StyledLabel>
          <Form.Item
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!',
              },
              {
                type: 'string',
                min: 6,
                message: 'Password is too short',
              },
            ]}
            hasFeedback
          >
            <Input.Password />
          </Form.Item>

          <StyledLabel>Confirm password</StyledLabel>
          <Form.Item
            name='confirm'
            dependencies={['password']}
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Please confirm your password!',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }

                  return Promise.reject(new Error('The two passwords that you entered do not match!'));
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type='primary' htmlType='submit' disabled={isExec}>
              {isExec ? 'Loading...' : 'register'}
            </Button>
          </Form.Item>
        </Form>
      </Wrapper>
    </PageContainer>
  );
};

export default RegisterUser;