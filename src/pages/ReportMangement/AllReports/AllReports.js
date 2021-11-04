import { useState } from 'react';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { PageContainer } from '../../../containers';
import { AppPagination, CustomTable, PageTitle } from '../../../components';
import { FilterWrapper, StyledSelect } from '../../PostManagement/ListPost/ListPost';
import { Select, Skeleton } from 'antd';
import { reportsColumns } from '../config';
import styled from 'styled-components';
import { privateRoute } from '../../../routes';
import { useHistory } from 'react-router-dom';

const TableCard = styled.div`
  width: 100%;
  padding: 10px;
`;

const AllReports = () => {
  const history = useHistory();
  const [dataSearch, setDataSearch] = useState({ status: 0, page: 1, limit: 10, type: 'post' });
  const { data = {}, isLoading, error } = useQuery(['memeServices.listReports', dataSearch],
    ({ queryKey }) => memeServices.listReports(queryKey[1]),
    {
      keepPreviousData: true,
    });

  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };

  const listData = data?.data?.content.map(item => ({ ...item, key: item.id }));
  return (
    <PageContainer>
      <PageTitle>All Reports</PageTitle>
      <FilterWrapper>
        <div>
          <StyledSelect
            defaultValue='post'
            onChange={(value) => setDataSearch({ ...dataSearch, type: value })}
          >
            <Select.Option value='post'>Post Reports</Select.Option>
            <Select.Option value='user'>User Reports</Select.Option>
          </StyledSelect>
          <StyledSelect
            defaultValue={0}
            onChange={(value) => setDataSearch({ ...dataSearch, status: value })}
          >
            <Select.Option value={0}>Pending</Select.Option>
            <Select.Option value={1}>Resolved</Select.Option>
            <Select.Option value={-1}>Deleted</Select.Option>
          </StyledSelect>
        </div>
      </FilterWrapper>
      <TableCard>
        {
          isLoading ? (
            <Skeleton />
          ) : error ? (<p>Some errors have occurred</p>) : (
            <CustomTable
              data={listData}
              columns={reportsColumns}
              onRowClick={(record) => {
                if (record.type === 'POST_REPORT') {
                  history.push(privateRoute.postDetail.url(record.targetId));
                } else {
                  history.push(privateRoute.userDetail.url(record.targetId));
                }
              }}
            />
          )
        }
      </TableCard>
      {(!isLoading && !error) && (
        <AppPagination defaultCurrent={1} total={data.data.totalElements} onPageChangeHandler={onPageChangeHandle}
                       limit={dataSearch.limit} />
      )}
    </PageContainer>
  );
};

export default AllReports;