import { PageContainer } from '../../../containers';
import { PageTitle } from '../../../components';
import styled from 'styled-components';
import { Button, Col, DatePicker, Form, Image, Input, Row, Select, Skeleton, Upload } from 'antd';
import { addItemToLocalStorage, getBase64, getLocalStorageObject } from '../../../utils';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { toast } from 'react-hot-toast';
import moment from 'moment';
import Fire from '../../../services/fire';
import useAuthentication from '../../../hooks/useAuthentication';
import { PROFILE_STORAGE_KEY } from '../../../constants';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
const StyledDatePicker = styled(DatePicker)`
  border: 1px solid #111;
  border-radius: 7px;
  outline: none;
  height: 50px;
  padding: 0 20px;
  font-weight: 600;
  width: 100%;
`;

const StyledTextInput = styled(Input)`
  border: 1px solid #111;
  border-radius: 7px;
  outline: none;
  height: 50px;
  padding: 0 20px;
  font-weight: 600;
`;

const StyledSelect = styled(Select)`
  outline: none;
  height: 50px;

  .ant-select-selector, .ant-select-selection-search-input {
    height: 50px !important;
    border-radius: 7px !important;
    padding-top: 10px !important;
  }
`;

const FormItemWrapper = styled.div`
  margin-bottom: 40px;
  margin-top: 30px;
  position: relative;
`;

const SubmitBtn = styled.button`
  width: 100%;
  height: 50px;
  background: #cfb675;
  border-radius: 7px;
  font-size: 18px;
  font-weight: 600;
  border: none;
  outline: none;
  transition: background-color .5s;

  &:hover, &:disabled {
    background: #907F51;
  }
`;
const FloatLabel = styled.label`
  position: absolute;
  top: -30px;
  left: 0px;
  background: #111;
  color: #fff;
  padding: 0 7px;
  font-weight: 600;
`;

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];

const EditUserProfile = () => {
  const { id } = useParams();
  const { user } = useAuthentication();
  const { data = {}, isLoading, error } = useQuery(['memeServices.userDetail', id],
    ({ queryKey }) => memeServices.userDetail(queryKey[1]));
  const { data: apiUser = {} } = data;
  const [form] = Form.useForm();
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState();
  useEffect(() => {
    setImage(apiUser.avatar);
  }, [apiUser]);
  const handleChooseFile = ({ file }) => {
    if (ALLOWED_TYPES.includes(file.type)) {
      setFile(file);
      getBase64(file, setImage);
    } else {
      toast.error('File Type is not allowed');
    }
  };
  const onFinish = async (values) => {
    if (!image && !file) {
      toast.error('please upload file');
      return;
    }
    const updateProfilePromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        let avatar = image;
        if (file) {
          avatar = await Fire.create.uploadImage(file);
        }
        const birthday = values.birthday.format('DD-MM-YYYY');
        const res = await memeServices.updateProfile(id, { ...values, avatar, birthday });
        if (parseInt(id) === parseInt(user.id)) {
          const inLocalStr = getLocalStorageObject(PROFILE_STORAGE_KEY);
          const newProfile = { ...inLocalStr, ...res.data };
          addItemToLocalStorage(PROFILE_STORAGE_KEY, newProfile);
        }
        window.location.reload();
        resolve();
      } catch (err) {
        console.log(err);
        reject(err);
      } finally {
        setLoading(false);
      }
    });

    await toast.promise(updateProfilePromise, {
      loading: 'Updating profile...',
      success: () => `Updated profile success !!`,
      error: (err) => `Updated failed: ${err.message} !`,
    });
  };
  const onFinishFailed = () => {
    toast.error('Please check form value again');
  };
  return (
    <PageContainer>
      <PageTitle>Edit User Profile</PageTitle>
      <Wrapper>
        {
          isLoading ? (<Skeleton />) : error ? (<p>Some error has occurred</p>) : (
            <Form
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              name='editProfile'
              form={form}
            >
              <Row gutter={24}>
                <Col span={12}>
                  <h4>Avatar</h4>
                  <FormItemWrapper>
                    <Upload.Dragger
                      accept={ALLOWED_TYPES.join(', ')}
                      showUploadList={false}
                      customRequest={handleChooseFile}
                      className='mb-24'
                      height={180}
                    >
                      {image ? (
                        <Image src={image} height={150} preview={false} />
                      ) : (
                        <div className='flex-row justify-content-center'>
                          <p>
                            PNG, JPG, WEBP or GIF. Max 10mb.
                          </p>
                          <Button>
                            Choose File
                          </Button>
                        </div>
                      )}
                    </Upload.Dragger>
                  </FormItemWrapper>
                </Col>
                <Col span={12}>
                  <h4>Profile</h4>
                  <Row gutter={24}>
                    <Col span={16}>
                      <FormItemWrapper>
                        <Form.Item
                          name='fullName'
                          rules={[{ required: true, message: 'Full name is required' }]}
                          initialValue={apiUser.fullName}
                        >
                          <StyledTextInput
                            type='text'
                            placeholder='Enter full Name...'
                          />
                        </Form.Item>
                        <FloatLabel>Full name *</FloatLabel>
                      </FormItemWrapper>
                    </Col>
                    <Col span={8}>
                      <FormItemWrapper>
                        <Form.Item
                          name='gender'
                          rules={[{ required: true, message: 'Please select gender' }]}
                          initialValue={apiUser.gender}
                        >
                          <StyledSelect>
                            <Select.Option value={0}>Female</Select.Option>
                            <Select.Option value={1}>Male</Select.Option>
                          </StyledSelect>
                        </Form.Item>
                        <FloatLabel>Gender *</FloatLabel>
                      </FormItemWrapper>
                    </Col>
                  </Row>
                  <Row gutter={24}>
                    <Col span={12}>
                      <FormItemWrapper>
                        <Form.Item
                          name='birthday'
                          rules={[{ required: true, message: 'Please pick a date' }]}
                          initialValue={apiUser.birthday && moment(apiUser.birthday)}
                        >
                          <StyledDatePicker format='DD/MM/YYYY' />
                        </Form.Item>
                        <FloatLabel>Birthday *</FloatLabel>
                      </FormItemWrapper>
                    </Col>
                    <Col span={12}>
                      <FormItemWrapper>
                        <Form.Item
                          name='phone'
                          rules={[{ required: true, message: 'phone number is required' }]}
                          initialValue={apiUser.phone}
                        >
                          <StyledTextInput
                            type='text'
                            placeholder='Enter phone number...'
                          />
                        </Form.Item>
                        <FloatLabel>Phone *</FloatLabel>
                      </FormItemWrapper>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Form.Item>
                <SubmitBtn type='submit' disabled={loading}>
                  {loading ? 'updating' : 'Update'}
                </SubmitBtn>
              </Form.Item>
            </Form>
          )
        }
      </Wrapper>
    </PageContainer>
  );
};

export default EditUserProfile;