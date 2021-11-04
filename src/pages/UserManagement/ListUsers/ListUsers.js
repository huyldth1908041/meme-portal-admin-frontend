import { PageContainer } from '../../../containers';
import { AppPagination, CustomTable, PageTitle, SearchBar } from '../../../components';
import { Select, Skeleton } from 'antd';
import { FilterWrapper, StyledSelect } from '../../PostManagement/ListPost/ListPost';
import { useState } from 'react';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { userColumns } from './config';
import { privateRoute } from '../../../routes';
import { useHistory } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  padding: 15px;
`;
const ListUsers = () => {
  const history = useHistory();
  const [dataSearch, setDataSearch] = useState({ page: 1, limit: 10, status: 1 });
  const { data = {}, isLoading, error } = useQuery(['memeServices.searchUsers', dataSearch],
    ({ queryKey }) => memeServices.searchUsers(queryKey[1]),
    {
      keepPreviousData: true,
    });
  const listData = data?.data?.content.map(item => ({ ...item, key: item.id }));
  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };
  return (
    <PageContainer>
      <PageTitle>List Users</PageTitle>
      <Wrapper>
        <FilterWrapper>
          <div>
            <StyledSelect
              defaultValue={1}
              onChange={(value) => setDataSearch({ ...dataSearch, status: value })}
            >
              <Select.Option value={1}>Active</Select.Option>
              <Select.Option value={-1}>De-active</Select.Option>
            </StyledSelect>

            <StyledSelect
              defaultValue={1}
              onChange={(value) => setDataSearch({ ...dataSearch, gender: value })}
            >
              <Select.Option value={1}>male</Select.Option>
              <Select.Option value={0}>Female</Select.Option>
            </StyledSelect>
            {/*TODO: QUERY FROM ROLES TABLE*/}
            <StyledSelect
              defaultValue='user'
              onChange={(value) => setDataSearch({ ...dataSearch, role: value })}
            >
              <Select.Option value='admin'>admin</Select.Option>
              <Select.Option value='user'>user</Select.Option>
            </StyledSelect>

            <StyledSelect
              defaultValue='createdAt-desc'
              onChange={value => {
                const [sortBy, direction] = value.split('-');
                setDataSearch({ ...dataSearch, sortBy: sortBy, order: direction });
              }}
            >
              <Select.Option value='createdAt-desc'>Recently Created</Select.Option>
              <Select.Option value='createdAt-asc'>Longtime Created</Select.Option>
            </StyledSelect>
          </div>
          <div style={{ width: 220 }}>
            <SearchBar placeholderText='Search users...' onSearch={q => {
              setDataSearch({ ...dataSearch, fullName: q });
            }} />
          </div>
        </FilterWrapper>
        {
          isLoading ? (
            <Skeleton />
          ) : error ? (<p>Some error has occurred : {error.message}</p>) : (
            <CustomTable
              data={listData}
              columns={userColumns}
              onRowClick={(record) => {
                history.push(privateRoute.userDetail.url(record.id));
              }}
            />
          )
        }
        {(!isLoading && !error) && (
          <AppPagination
            defaultCurrent={1}
            total={data.data.totalElements}
            onPageChangeHandler={onPageChangeHandle}
            limit={dataSearch.limit}
          />)}
      </Wrapper>
    </PageContainer>
  );
};

export default ListUsers;