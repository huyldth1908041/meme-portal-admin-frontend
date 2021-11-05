import { PageContainer } from '../../../containers';
import { PageTitle } from '../../../components';
import { Avatar, Button, Col, Image, Row, Skeleton } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import moment from 'moment';
import { toast } from 'react-hot-toast';


const CenterFlexBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  padding: 20px;
`;
const StyledImage = styled(Image)`
  max-height: 480px;
  min-width: 150px;
`;
const ContentWrapper = styled.div`
  width: 100%;
  color: #fff;
  padding: 20px;
`;
const Title = styled.div`
  font-weight: 600;
  color: #fff;
  font-size: 20px;
`;
const Creator = styled.div`
  margin-top: 20px;
  display: flex;
  align-items: center;

  .creator-in4 {
    margin-left: 20px;

    div:first-child {
      font-weight: 600;
      margin-bottom: 5px;
    }
  }
`;
const AdsInformations = styled.div`
  margin-top: 20px;

  > div {
    margin-top: 10px;
  }
`;
const Label = styled.div`
  display: inline-block;
  font-weight: 600;
`;

const ActionButtons = styled.div`
  margin-top: 50px;
  display: flex;
  width: 50%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
`;
const getAdStatus = (status) => {
  switch (status) {
    case 0:
      return 'not purchased yet';
    case 1:
      return 'Pending';
    case 2:
      return 'active';
    case -1:
      return 'deleted';
    default:
      return '';
  }
};
const AdvertisementDetail = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { data = {}, isLoading, refetch, error } = useQuery(['memeServices.advertisementDetail', id],
    ({ queryKey }) => memeServices.advertisementDetail(queryKey[1]));
  const { data: advertisement = {} } = data;
  const {
    data: showingAdsData = {},
    isLoading: isLoadingShowingAdsData,
    error: isShowingAdsError,
    refetch: reFetchIsShowingAd,
  } = useQuery(['memeServices.getShowingAdvertisement'],
    () => memeServices.getShowingAdvertisement());
  const handleDelete = async () => {
    const deletePromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        await memeServices.deleteAdvertisement(id);
        await refetch();
        await reFetchIsShowingAd();
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
  const handleVerify = async () => {
    const verifyPromise = new Promise(async (resolve, reject) => {
      try {
        setLoading(true);
        await memeServices.verifyAdvertisements({ listIds: [id] });
        await refetch();
        await reFetchIsShowingAd();
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

  return (
    <PageContainer>
      <PageTitle>Advertisement Detail</PageTitle>
      {
        isLoading ? <Skeleton /> : error ? <p>Some error has occurred</p> : (
          <Row gutter={24}>
            <Col span={12}>
              <CenterFlexBox>
                <StyledImage src={advertisement.image} alt='advertisement-image' preview={false} />
              </CenterFlexBox>
            </Col>
            <Col span={12}>
              <ContentWrapper>
                <Title>{advertisement.title}</Title>
                <Creator className='flex-row'>
                  <Avatar src={advertisement.creator.avatar || '/assets/images/default-avatar.jpg'} size={70}
                          alt='creator' />
                  <div className='creator-in4'>
                    <div>{advertisement.creator.fullName}</div>
                    <div>Created
                      at: {moment(advertisement.createdAt, 'YYYY-MM-DD[T]hh:mm:ssZ').format('DD/MM/YYYY hh:mm')}</div>
                  </div>
                </Creator>
                <AdsInformations>
                  <div>
                    <Label>Url: </Label> {advertisement.url}
                  </div>
                  <div>
                    <Label>Content: </Label> {advertisement.content}
                  </div>
                  <div>
                    <Label>Status: </Label> {getAdStatus(advertisement.status)}
                  </div>
                  <div>
                    <Label>Is showing on user page: </Label>
                    {
                      isLoadingShowingAdsData ? <span>Loading...</span> : isShowingAdsError ? <span>No</span> : (
                        <>
                          {
                            showingAdsData.data ? (+showingAdsData.data.id === +id ? ' Yes' : ' No') : ' No'
                          }
                        </>
                      )
                    }

                  </div>
                </AdsInformations>
                <ActionButtons>
                  {
                    advertisement.status === 1 && (
                      <Button
                        type='primary'
                        disabled={loading}
                        onClick={handleVerify}
                      >
                        Verify
                      </Button>
                    )
                  }
                  {
                    advertisement.status > 0 && (
                      <Button
                        type='primary'
                        danger
                        onClick={handleDelete}
                        disabled={loading}
                      >
                        {loading ? 'Deleting' : 'Delete'}
                      </Button>
                    )
                  }
                </ActionButtons>
              </ContentWrapper>
            </Col>
          </Row>
        )
      }
    </PageContainer>
  );
};

export default AdvertisementDetail;