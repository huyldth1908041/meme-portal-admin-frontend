import { PageContainer } from '../../../containers';
import { AppPagination, CustomTable, PageTitle, SearchBar } from '../../../components';
import { Select, Skeleton } from 'antd';
import { useState } from 'react';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import styled from 'styled-components';
import { postColumns } from './config';


const ContentWrapper = styled.div`
  width: 100%;
  padding: 15px;
`;

export const StyledSelect = styled(Select)`
  > div.ant-select-selector {
    border: 1px solid #111;
    border-radius: 7px !important;
    outline: none;
    height: 40px !important;
    min-width: 150px !important;
    padding: 5px 20px !important;
    font-weight: 600;
  }

  margin: 0 10px;
`;

export const FilterWrapper = styled.div`
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
`;
const ListPost = () => {
  const [dataSearch, setDataSearch] = useState({ page: 1, limit: 10, status: 1 });
  const { data = {}, isLoading, error } = useQuery(['memeServices.searchMemes', dataSearch],
    ({ queryKey }) => memeServices.searchMemes(queryKey[1]),
    {
      keepPreviousData: true,
    });

  const { data: categoriesData = {} } = useQuery(['memeServices.getCategories'], () => memeServices.getCategories());
  const { data: categories = {} } = categoriesData;
  const listData = data?.data?.content.map(item => ({ ...item, key: item.id }));
  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };
  return (
    <PageContainer>
      <PageTitle>All Posts</PageTitle>
      <ContentWrapper>
        <FilterWrapper>
          <div>
            <StyledSelect
              defaultValue={1}
              onChange={(value) => setDataSearch({ ...dataSearch, categoryId: value })}>
              {
                categories.length &&
                categories.map(cat => <Select.Option value={cat.id} key={cat.id}>{cat.name}</Select.Option>)
              }
            </StyledSelect>
            <StyledSelect
              defaultValue={1}
              onChange={(value) => setDataSearch({ ...dataSearch, status: value })}
            >
              <Select.Option value={1}>Active</Select.Option>
              <Select.Option value={2}>Pending</Select.Option>
              <Select.Option value={-1}>Deleted</Select.Option>
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
            <SearchBar placeholderText='Search post...' onSearch={q => {
              setDataSearch({ ...dataSearch, title: q });
            }} />
          </div>
        </FilterWrapper>
        {
          isLoading ? (
            <Skeleton />
          ) : error ? (<p>Some error has occurred : {error.message}</p>) : (
            <CustomTable
              data={listData}
              columns={postColumns}
              // width='100%'
              // renderTitle={<h1>Need verify posts</h1>}
            />
          )
        }
      </ContentWrapper>
      {(!isLoading && !error) && (
        <AppPagination defaultCurrent={1} total={data.data.totalElements} onPageChangeHandler={onPageChangeHandle}
                       limit={dataSearch.limit} />
      )}
    </PageContainer>
  );
};

export default ListPost;