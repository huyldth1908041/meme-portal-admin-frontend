import { PageContainer } from '../../../containers';
import { PageTitle } from '../../../components';
import { Col, Form, Input, Row, Select, Upload, Image } from 'antd';
import useForm from 'antd/es/form/hooks/useForm';
import styled from 'styled-components';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getBase64 } from '../../../utils';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import Fire from '../../../services/fire';


const StyledCol = styled(Col)`
  padding: 0 20px !important;
  margin-bottom: 30px;
`;

const StyledTextInput = styled(Input)`
  border: 1px solid #111;
  border-radius: 15px;
  outline: none;
  height: 50px;
  padding: 0 20px;
  font-weight: 600;

`;
const StyledTextArea = styled(Input.TextArea)`
  border: 1px solid #111;
  border-radius: 15px;
  padding: 10px 20px;
  font-weight: 600;
  height: 500px;
`;
const UploadButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-color: transparent;
  font-weight: 600;
  font-size: 16px;
`;
const UploadHelper = styled.div`
  width: 100%;
  height: 150px;
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  color: #999;

`;
const SubmitButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  background-image: linear-gradient(to right, #349eff, #62b4ff);
  padding: 15px 30px;
  border-radius: 15px;
  margin: 0 auto;
  display: block;
  width: fit-content;
  color: #fff;
  font-size: 16px;
`;
const PreviewUploadFile = styled(Image)`
  position: relative;
  top: -15px;
`;

const StyledSelect = styled(Select)`
  > div.ant-select-selector {
    border: 1px solid #111;
    border-radius: 15px !important;
    outline: none;
    height: 50px !important;
    padding: 10px 20px !important;
    font-weight: 600;
  }
`;

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp'];
const CreatePost = () => {
  const [file, setFile] = useState();
  const [image, setImage] = useState();
  const [loading, setLoading] = useState(false);
  // const [uploadedImgUrl, setUploadedImgUrl] = useState();

  const { data = {} } = useQuery(['memeServices.getCategories'], () => memeServices.getCategories());
  const { data: categories = {} } = data;
  const handleChooseFile = ({ file }) => {
    if (ALLOWED_TYPES.includes(file.type)) {
      setFile(file);
      getBase64(file, setImage);
    } else {
      toast.error('File Type is not allowed');
    }
  };
  const onFinish = async (values) => {
    if (!file) {
      toast.error('Please upload image!');
      return;
    }
    const createPostPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        const uploadedImageUrl = await Fire.create.uploadImage(file);
        const res = await memeServices.createPost({ ...values, image: uploadedImageUrl });
        if (res.status === 201) {
          form.resetFields();
          setImage('');
          setFile({});
          resolve();
        }
      } catch (err) {
        console.error(err);
        reject(err);
      } finally {
        setLoading(false);
      }
    });

    await toast.promise(createPostPromise, {
      loading: 'Saving post...',
      success: () => `Saved success !!`,
      error: (err) => `Creat post failed: ${err.message} !`,
    });
  };
  const onFinishFailed = () => {
    toast.error('Please check form values');
  };
  const [form] = useForm();
  return (
    <PageContainer>
      <PageTitle>Create new post</PageTitle>
      <Form
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        form={form}
        name='createItem'
      >
        <Row gutter={16}>
          <StyledCol xl={16}>
            <Form.Item
              name='title'
              rules={[{ required: true, message: 'Title is required' }]}
            >
              <StyledTextInput type='text' placeholder='Name' />
            </Form.Item>
          </StyledCol>


          <StyledCol xl={8}>
            <Form.Item
              name='categoryId'
              rules={[{ required: true, message: 'Category is required' }]}
              initialValue={categories.length ? categories[0].id : 1}
            >
              <StyledSelect>
                {
                  categories.length &&
                  categories.map(cat => <Select.Option value={cat.id} key={cat.id}>{cat.name}</Select.Option>)
                }
              </StyledSelect>
            </Form.Item>
          </StyledCol>

          <StyledCol xs={12}>
            <Form.Item
              name='description'
              rules={[{ required: true, message: 'Description is required' }]}
            >
              <StyledTextArea placeholder='Description' rows={6} />
            </Form.Item>
          </StyledCol>

          <StyledCol xs={7}>
            <Upload.Dragger
              accept={ALLOWED_TYPES.join(', ')}
              showUploadList={false}
              customRequest={handleChooseFile}
              height={150}
              style={{ borderRadius: '15px', overflow: 'hidden' }}
            >
              {image ? (
                <PreviewUploadFile src={image} preview={false} height={150} />
              ) : (
                <UploadButton type='button'>
                  Upload File
                </UploadButton>
              )}
            </Upload.Dragger>
          </StyledCol>
          <StyledCol xs={5}>
            <UploadHelper>
              <p> PNG, GIF, WEBP, MP4 or MP3. Max 30mb.</p>
            </UploadHelper>
          </StyledCol>

        </Row>
        <Form.Item>
          <SubmitButton type='submit' disabled={loading}>
            {loading ? 'Saving...' : 'Create'}
          </SubmitButton>
        </Form.Item>
      </Form>
    </PageContainer>
  );
};

export default CreatePost;