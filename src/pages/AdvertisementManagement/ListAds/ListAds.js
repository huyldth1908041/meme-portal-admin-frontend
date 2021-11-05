import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { PageContainer } from '../../../containers';
import { AppPagination, CustomTable, PageTitle } from '../../../components';
import { Select, Skeleton } from 'antd';
import { advertisementColumns } from '../config';
import { privateRoute } from '../../../routes';
import styled from 'styled-components';
import { FilterWrapper, StyledSelect } from '../../PostManagement/ListPost/ListPost';

const TableCard = styled.div`
  width: 100%;
  padding: 10px;
`;
const ListAds = () => {
  const history = useHistory();
  const [dataSearch, setDataSearch] = useState({ status: 2, page: 1, limit: 10 });
  //status = 0 created but not purchased, status = 1 purchased not verfied, status = 2 verified

  const { data = {}, isLoading, error } = useQuery(['memeServices.searchAdvertisements', dataSearch],
    ({ queryKey }) => memeServices.searchAdvertisements(queryKey[1]),
    {
      keepPreviousData: true,
    });


  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };

  const listData = data?.data?.content.map(item => ({ ...item, key: item.id }));
  return (
    <PageContainer>
      <PageTitle>All Advertisements</PageTitle>
      <FilterWrapper>
        <div>
          {/*status = 0 created but not purchased, status = 1 purchased not verfied, status = 2 verified -1 deleted*/}
          <StyledSelect
            defaultValue={2}
            onChange={(value) => setDataSearch({ ...dataSearch, status: value })}
          >
            <Select.Option value={0}>Not purchased yet</Select.Option>
            <Select.Option value={1}>Pending</Select.Option>
            <Select.Option value={2}>Active</Select.Option>
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
              columns={advertisementColumns}
              onRowClick={(record) => {
                history.push(privateRoute.advertisementDetail.url(record.id));
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

export default ListAds;