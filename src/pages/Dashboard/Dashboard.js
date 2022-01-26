import { PageContainer } from '../../containers';
import { CustomTable, DashBoardCard, PageTitle } from '../../components';
import { Col, Row, Select, Skeleton } from 'antd';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts';
import styled from 'styled-components';
import { topCreatorColumns, topTokenColumns } from './config';
import { useQuery } from 'react-query';
import memeServices from '../../services/memeServices';
import { useState } from 'react';
import moment from 'moment';
import { FilterWrapper, StyledSelect } from '../PostManagement/ListPost/ListPost';
import { privateRoute } from '../../routes';
import { useHistory } from 'react-router-dom';

const StyledCard = styled.div`
  padding: 20px;
  margin-top: 20px;
  width: 100%;
`;
const TableTitle = styled.div`
  font-weight: 600;
  color: #fff;
  margin-bottom: 20px;
  font-size: 20px;
`;
const Dashboard = () => {
    const history = useHistory();
    const [dataSearch, setDataSearch] = useState({ days: 7 });
    const [userDataSearch, setUserDataSearch] = useState({ days: 7 });
    const {
      data: statsData = {},
      isLoading: isLoadingStats,
      error: statsError,
    } = useQuery(['memeServices.getDashboardStatistic'],
      () => memeServices.getDashboardStatistic());
    const {
      data: postStatsData = {},
      isLoading: isLoadingPostStats,
      error: postStatsError,
    } = useQuery(['memeServices.getDashboardStatistic', dataSearch],
      ({ queryKey }) => memeServices.getPostStatistics(queryKey[1]));
    const { data: listPosts = [] } = postStatsData;
    const categories = [];
    const postCounts = [];
    listPosts.forEach(item => {
      postCounts.push(item.postCount);
      const apiTime = item.createdAt;
      const time = moment(apiTime, 'YYYY-MM-DD[T]hh:mm:ssZ').format('DD-MM-YYYY');
      categories.push(time);
    });

    const {
      data: userStatsData = {},
      isLoading: isLoadingUserStats,
      error: userStatsError,
    } = useQuery(['memeServices.getUserStatistics', userDataSearch],
      ({ queryKey }) => memeServices.getUserStatistics(queryKey[1]));
    const { data: listUsers = [] } = userStatsData;
    const userCategories = [];
    const userCounts = [];
    listUsers.forEach(item => {
      userCounts.push(item.userCount);
      const apiTime = item.createdAt;
      const time = moment(apiTime, 'YYYY-MM-DD[T]hh:mm:ssZ').format('DD-MM-YYYY');
      userCategories.push(time);
    });
    const {
      data: {
        totalActiveUsers,
        totalPosts,
        hotPosts,
        newPosts,
        totalTokenSpent,
        totalTransactions,
      } = {},
    } = statsData;
    const chartOptions = {
      xAxis: {
        categories: categories,
      },
      series: [
        {
          data: postCounts,
          name: 'Posts',
        },

      ],
      backgroundColor: '#111',
      chart: {
        backgroundColor: '#111',
      },
      title: {
        style: { color: '#fff' },
        text: 'Recently Created Posts',
      },
    };
    const userChartOptions = {
      xAxis: {
        categories: userCategories,
      },
      series: [
        {
          data: userCounts,
          name: 'Users',
        },

      ],
      backgroundColor: '#111',
      chart: {
        backgroundColor: '#111',
      },
      title: {
        style: { color: '#fff' },
        text: 'Recently Register Users',
      },
    };
    const {
      data: topToken = {},
      isLoading: isLoadingTopToken,
      error: topTokenError,
    } = useQuery(['memeServices.getTopToken'], () => memeServices.getTopToken());
    const listTopTokenData = topToken?.data?.map(item => ({ ...item, key: item.id }));

    const {
      data: topCreator = {},
      isLoading: isLoadingTopCreator,
      error: topCreatorError,
    } = useQuery(['memeServices.getTopCreator'], () => memeServices.getTopCreator());
    const listTopCreatorData = topCreator?.data?.map(item => ({ ...item, key: item.id }));

    return (
      <PageContainer>
        <PageTitle>Dashboard</PageTitle>
        {
          isLoadingStats ? (<Skeleton />) : statsError ? <p>Some error has occurred</p> : (
            <Row gutter={24}>
              <Col span={8}>
                <DashBoardCard label='Total Posts' value={totalPosts} unit={'posts in system'} icon='bx-images' />
              </Col>
              <Col span={8}>
                <DashBoardCard label='Hot Posts' value={hotPosts} unit={'posts in hot category'} icon='bxs-hot' />
              </Col>
              <Col span={8}>
                <DashBoardCard label='New Posts' value={newPosts} unit='posts verified' icon='bx-image-add' />
              </Col>
            </Row>
          )
        }
        <StyledCard className='card'>
          <Row gutter={24}>
            <Col span={12}>
              <FilterWrapper>
                <StyledSelect
                  defaultValue={7}
                  onChange={(value) => setDataSearch({ ...dataSearch, days: value })}
                >
                  <Select.Option value={7}>One Week</Select.Option>
                  <Select.Option value={10}>10 Days</Select.Option>
                  <Select.Option value={30}>One Month</Select.Option>
                </StyledSelect>
              </FilterWrapper>
              {
                isLoadingPostStats ? <Skeleton /> : postStatsError ? <p>Some error has occurred</p> : (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={chartOptions}
                  />
                )
              }

            </Col>
            <Col span={12}>
              <FilterWrapper>
                <StyledSelect
                  defaultValue={7}
                  onChange={(value) => setUserDataSearch({ ...userDataSearch, days: value })}
                >
                  <Select.Option value={7}>One Week</Select.Option>
                  <Select.Option value={10}>10 Days</Select.Option>
                  <Select.Option value={30}>One Month</Select.Option>
                </StyledSelect>
              </FilterWrapper>
              {
                isLoadingUserStats ? <Skeleton /> : userStatsError ? <p>Some error has occurred</p> : (
                  <HighchartsReact
                    highcharts={Highcharts}
                    options={userChartOptions}
                  />
                )
              }

            </Col>
          </Row>
        </StyledCard>
        {
          isLoadingStats ? (<Skeleton />) : statsError ? <p>Some error has occurred</p> : (
            <Row gutter={24} style={{ marginTop: '20px' }}>
              <Col span={8}>
                <DashBoardCard label='Total Users' value={totalActiveUsers} unit='users in systems'
                               icon={'bx-images'} />
              </Col>
              <Col span={8}>
                <DashBoardCard label='Total Transactions ' value={totalTransactions} unit='transactions processed'
                               icon='bx-transfer' />
              </Col>
              <Col span={8}>
                <DashBoardCard label='Tokens Spent' value={totalTokenSpent} unit={'tokens was spent'}
                               icon={'bx-dollar-circle'} />
              </Col>
            </Row>
          )
        }
        <StyledCard>
          <Row gutter={24}>
            <Col span={12}>
              <TableTitle>Top Tokens Owners</TableTitle>
              {
                isLoadingTopToken ? (<Skeleton />) : topTokenError ? <p>Some error has occurred</p> : (
                  <CustomTable
                    columns={topTokenColumns}
                    data={listTopTokenData}
                    onRowClick={(record) => {
                      history.push(privateRoute.userDetail.url(record.user.id));
                    }}
                  />
                )
              }
            </Col>
            <Col span={12}>
              <TableTitle>Top Creators</TableTitle>
              {
                isLoadingTopCreator ? (<Skeleton />) : topCreatorError ? (<p>Some error has occurred</p>) : (
                  <CustomTable
                    columns={topCreatorColumns}
                    data={listTopCreatorData}
                    onRowClick={(record) => {
                      history.push(privateRoute.userDetail.url(record.user.id));
                    }}
                  />
                )
              }
            </Col>
          </Row>
        </StyledCard>
      </PageContainer>
    );
  }
;

export default Dashboard;