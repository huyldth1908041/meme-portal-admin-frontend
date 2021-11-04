import { useState } from 'react';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { toast } from 'react-hot-toast';
import { PageContainer } from '../../../containers';
import { AppPagination, CustomTable, PageTitle } from '../../../components';
import { Button, Select, Skeleton } from 'antd';
import styled from 'styled-components';
import { reportsColumns } from '../config';
import { FilterWrapper, StyledSelect } from '../../PostManagement/ListPost/ListPost';
import { useHistory } from 'react-router-dom';
import { privateRoute } from '../../../routes';

const TableCard = styled.div`
  width: 100%;
  padding: 10px;
`;
const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;

const StyledButton = styled(Button)`
  margin: 0 10px;
`;

const PendingReports = () => {
  const history = useHistory();
  const [dataSearch, setDataSearch] = useState({ status: 0, page: 1, limit: 10, type: 'post' });
  const [selectedIds, setSelectedIds] = useState([]);
  const { data = {}, isLoading, refetch, error } = useQuery(['memeServices.listReports', dataSearch],
    ({ queryKey }) => memeServices.listReports(queryKey[1]),
    {
      keepPreviousData: true,
    });
  const handleRowSelectionChange = (reportIds) => {
    setSelectedIds(reportIds);
  };
  const handleResolveReport = async () => {
    if (selectedIds.length === 0) {
      toast.error('Please select report to verify');
      return;
    }
    const verifyReportPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await memeServices.resolveReports({ listIds: selectedIds });
        if (res.status === 200) {
          await refetch();
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });

    await toast.promise(verifyReportPromise, {
      loading: 'Verifying...',
      error: (err) => `Verify failed ${err.message}`,
      success: () => `Verify success!`,
    });
  };

  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };

  const listData = data?.data?.content.map(item => ({ ...item, key: item.id }));
  return (
    <PageContainer>
      <PageTitle>Pending Posts</PageTitle>
      <FilterWrapper>
        <StyledSelect
          defaultValue='post'
          onChange={(value) => setDataSearch({ ...dataSearch, type: value })}
        >
          <Select.Option value='post'>Post Reports</Select.Option>
          <Select.Option value='user'>User Reports</Select.Option>
        </StyledSelect>
      </FilterWrapper>
      <TableCard>
        {
          isLoading ? (
            <Skeleton />
          ) : error ? (<p>Some errors have occurred</p>) : (
            <CustomTable
              data={listData}
              columns={reportsColumns}
              // width='100%'
              selectionType='checkbox'
              onRowSelectionChange={handleRowSelectionChange}
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
      <ButtonGroup>
        <StyledButton type='primary' size='large' onClick={handleResolveReport}>Resolve Reports</StyledButton>
      </ButtonGroup>
      {(!isLoading && !error) && (
        <AppPagination defaultCurrent={1} total={data.data.totalElements} onPageChangeHandler={onPageChangeHandle}
                       limit={dataSearch.limit} />
      )}
    </PageContainer>
  );
};

export default PendingReports;