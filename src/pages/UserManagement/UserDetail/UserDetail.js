import { PageContainer } from '../../../containers';
import { PageTitle } from '../../../components';
import styled from 'styled-components';
import { Col, Row, Image, Button, Skeleton } from 'antd';
import { Link, useHistory, useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import moment from 'moment';
import useAuthentication from '../../../hooks/useAuthentication';
import { privateRoute } from '../../../routes';
import { useState } from 'react';
import { toast } from 'react-hot-toast';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
const StyledImage = styled(Image)`
  max-height: 350px;
  min-width: 150px;
`;
const CenterFlexContainer = styled.div`
  width: 100%;
  height: auto;
  display: flex;
  justify-content: center;
`;
const FlexBox = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  margin-bottom: 25px;
`;
const UserInformation = styled.div`
  display: flex;
  flex-wrap: wrap;
  min-width: 200px;
  font-size: 18px;
  margin-right: 25px;
  align-items: center;

  > div:first-child {
    font-weight: 600;
    margin-right: 10px;
  }
`;
const UserDetail = () => {
  const { id } = useParams();
  const history = useHistory();
  const { user } = useAuthentication();
  const { data = {}, isLoading, error } = useQuery(['memeServices.userDetail', id],
    ({ queryKey }) => memeServices.userDetail(queryKey[1]));
  const { data: apiUser = {} } = data;
  const [loading, setLoading] = useState(false);
  const handleDeActive = async () => {
    const deactivePromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        await memeServices.deactiveUser(id);
        history.push(privateRoute.listUsers.path);
      } catch (err) {
        console.log(err);
        reject(err);
      } finally {
        setLoading(false);
      }
    });
    await toast.promise(deactivePromise, {
      loading: 'Loading...',
      success: 'Updated success',
      error: err => `updated user failed ${err.message}`,
    });
  };
  return (
    <PageContainer>
      <PageTitle>User detail</PageTitle>
      <Wrapper>
        {
          isLoading ? (<Skeleton />) : error ?
            (<p>Some errors has occured or this user is deactive
              <Link to={privateRoute.listUsers.path}> return to list
                user </Link></p>) : (
              <Row gutter={24}>
                <Col span={12}>
                  <CenterFlexContainer>
                    <StyledImage src={apiUser.avatar || '/assets/images/default-avatar.jpg'} />
                  </CenterFlexContainer>
                </Col>
                <Col span={12}>
                  <FlexBox>
                    <UserInformation>
                      <div>Username:</div>
                      <div>{apiUser.username}</div>
                    </UserInformation>
                    <UserInformation>
                      <div>Role:</div>
                      <div>{apiUser.role}</div>
                    </UserInformation>
                  </FlexBox>

                  <FlexBox>
                    <UserInformation>
                      <div>Full name:</div>
                      <div>{apiUser.fullName}</div>
                    </UserInformation>
                    <UserInformation>
                      <div>gender:</div>
                      <div>{apiUser.gender === 1 ? 'male' : 'female'}</div>
                    </UserInformation>
                  </FlexBox>

                  <FlexBox>
                    <UserInformation>
                      <div>Birthday:</div>
                      <div>
                        {apiUser.birthday ? moment(apiUser.birthday, 'YYYY-MM-DD[T]hh:mm:ssZ').format('DD/MM/YYYY') : 'not set'}
                      </div>
                    </UserInformation>
                    <UserInformation>
                      <div>Phone:</div>
                      <div>{apiUser.phone}</div>
                    </UserInformation>
                  </FlexBox>

                  <FlexBox>
                    <UserInformation>
                      <div>Status:</div>
                      <div>{apiUser.status > 0 ? 'active' : 'de-active'}</div>
                    </UserInformation>
                    <UserInformation>
                      <div>Token balances:</div>
                      <div>{apiUser.tokenBalance}</div>
                    </UserInformation>
                  </FlexBox>
                  <FlexBox>
                    <Link to={privateRoute.editUser.url(apiUser.id)}>
                      <Button type='primary' style={{ marginRight: 20 }}>
                        Edit
                      </Button>
                    </Link>
                    {
                      (apiUser.status > 0 && id !== user.id) && (
                        <Button
                          type='primary'
                          danger
                          onClick={handleDeActive}
                          disabled={loading}
                        >
                          {loading ? 'loading....' : ' De-active'}
                        </Button>)
                    }
                  </FlexBox>
                </Col>
              </Row>
            )
        }

      </Wrapper>
    </PageContainer>
  );
};
export default UserDetail;