import { Link, useParams } from 'react-router-dom';
import { PageContainer } from '../../../containers';
import { PageTitle } from '../../../components';
import { Button, Col, Image, Row, Skeleton, Tabs } from 'antd';
import styled from 'styled-components';
import CreatorBox from './CreatorBox';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { privateRoute } from '../../../routes';

const ContentWrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
const StyledImage = styled(Image)`
  max-height: 480px;
  min-width: 150px;
`;
const DescriptionBox = styled.div`
  width: 100%;
  padding: 20px;
  min-height: 100px;
`;
const Title = styled.p`
  color: #fff;
  font-weight: 600;
  font-size: ${props => props.size === 'heading' ? '30px' : '18px'};
`;
const StatusContainer = styled.div`
  margin-top: 10px;
  display: flex;
  justify-items: center;
  justify-content: space-between;
  width: 70%;
  font-size: 16px;
  font-weight: 400;
`;
const StatusIcon = styled.i`
  font-size: 18px;
  color: #fff;
  margin-right: 10px;
`;
const StatusBade = styled.div`
  background: #d84a1b;
  color: #fff;
  padding: 3px 12px;
  border-radius: 10px;
`;
const ActionButtons = styled.div`
  margin-top: 50px;
  display: flex;
  width: 50%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
`;
const StyledTabs = styled(Tabs)`
  color: #fff;
  margin-top: 40px;
  padding: 20px;
`;

const PostDetail = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data = {}, isLoading, refetch, error } = useQuery(['memeServices.postDetail', id],
    ({ queryKey }) => memeServices.postDetail(queryKey[1]));
  const { data: item = {} } = data;


  const handleVerify = async () => {
    const verifyPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        await memeServices.verifyPosts({ postIds: [id] });
        await refetch();
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        setLoading(false);
      }
    });
    await toast.promise(verifyPromise, {
      success: 'Updated Success',
      error: (err) => `Updated failed ${err.message}`,
      loading: 'Updating...',
    });
  };
  const handleDelete = async () => {

    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        await memeServices.deletePosts({ data: { postIds: [id] } });
        await refetch();
        resolve();
      } catch (err) {
        reject(err);
      } finally {
        setLoading(false);
      }
    });
    await toast.promise(deletePromise, {
      success: 'Updated Success',
      error: (err) => `Updated failed ${err.message}`,
      loading: 'Updating...',
    });
  };

  function callback(key) {
    console.log(key);
  }

  return (
    <PageContainer>
      <PageTitle>Post Detail</PageTitle>
      {
        isLoading ? (<Skeleton />) : error ? (<p>error: {error.message}</p>) : (
          <>
            <Row gutter={24}>
              <Col span={12}>
                <ContentWrapper style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <StyledImage src={item.image} preview={false} />
                </ContentWrapper>
              </Col>
              <Col span={12}>
                <ContentWrapper>
                  <Title size='heading'>{item.title}</Title>
                  <CreatorBox item={item} />
                  <DescriptionBox>
                    <p>Category: {item.category}</p>
                    <p>{item.description}</p>
                  </DescriptionBox>
                  <StatusContainer>
                    <div>
                      {item.likeCounts} <StatusIcon className='bx bxs-like' />
                    </div>
                    <div>
                      0 <StatusIcon className='bx bxs-comment' />
                    </div>
                    <div>
                      0 <StatusIcon className='bx bxs-upvote' />
                    </div>
                    <div>
                      <StatusBade>{item.status === 0 ? 'pending' : item.status === 1 ? 'Active' : 'Deleted'}</StatusBade>
                    </div>
                  </StatusContainer>
                  <ActionButtons>
                    <Button type='primary' icon={<StatusIcon className='bx bxs-pencil' />}>
                      <Link to={privateRoute.editPost.url(id)} style={{ color: '#fff' }}>Edit</Link>
                    </Button>
                    {
                      item.status === 0 && (
                        <Button
                          type='primary' icon={<StatusIcon
                          className='bx bx-check' />}
                          onClick={handleVerify}
                          disabled={loading}
                        >
                          {loading ? 'Loading...' : 'Verify'}
                        </Button>)
                    }
                    {
                      item.status > 0 && (
                        <Button
                          type='primary'
                          danger icon={<StatusIcon className='bx bxs-trash-alt' />}
                          onClick={handleDelete}
                        >
                          {loading ? 'Loading...' : 'Delete'}
                        </Button>)
                    }
                    {
                      item.status < 0 && (
                        <Button
                          type='primary'
                          danger icon={<StatusIcon className='bx bx-undo' />}
                          onClick={handleVerify}
                        >
                          {loading ? 'Loading...' : 'Recover'}
                        </Button>)
                    }
                  </ActionButtons>
                </ContentWrapper>
              </Col>
            </Row>
            <Row>
              <StyledTabs defaultActiveKey='1' onChange={callback}>
                <Tabs.TabPane tab='Likes History' key='1'>
                  Content of Tab Pane 1
                </Tabs.TabPane>
                <Tabs.TabPane tab='Vote History' key='2'>
                  Content of Tab Pane 2
                </Tabs.TabPane>
                <Tabs.TabPane tab='Comment History' key='3'>
                  Content of Tab Pane 3
                </Tabs.TabPane>
              </StyledTabs>
            </Row>
          </>
        )
      }
    </PageContainer>
  );
};

export default PostDetail;
