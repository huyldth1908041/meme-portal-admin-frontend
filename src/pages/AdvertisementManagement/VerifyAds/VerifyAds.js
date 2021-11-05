import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { toast } from 'react-hot-toast';
import { PageContainer } from '../../../containers';
import { AppPagination, CustomTable, PageTitle } from '../../../components';
import { Button, Skeleton } from 'antd';
import { privateRoute } from '../../../routes';
import styled from 'styled-components';
import { advertisementColumns } from '../config';

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

const VerifyAds = () => {
  const history = useHistory();
  const [dataSearch, setDataSearch] = useState({ status: 1, page: 1, limit: 10 });
  //status = 0 created but not purchased, status = 1 purchased not verfied, status = 2 verified -1 deleted
  const [selectedIds, setSelectedIds] = useState([]);
  const { data = {}, isLoading, refetch, error } = useQuery(['memeServices.searchAdvertisements', dataSearch],
    ({ queryKey }) => memeServices.searchAdvertisements(queryKey[1]),
    {
      keepPreviousData: true,
    });
  const handleRowSelectionChange = (adIds) => {
    setSelectedIds(adIds);
  };
  const handleVerifyPost = async () => {
    if (selectedIds.length === 0) {
      toast.error('Please select ads to verify');
      return;
    }
    const verifyPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await memeServices.verifyAdvertisements({ listIds: selectedIds });
        if (res.status === 200) {
          await refetch();
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });

    await toast.promise(verifyPromise, {
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
      <PageTitle>Verify Advertisements</PageTitle>
      <TableCard>
        {
          isLoading ? (
            <Skeleton />
          ) : error ? (<p>Some errors have occurred</p>) : (
            <CustomTable
              data={listData}
              columns={advertisementColumns}
              // width='100%'
              selectionType='checkbox'
              onRowSelectionChange={handleRowSelectionChange}
              onRowClick={(record) => {
                history.push(privateRoute.advertisementDetail.url(record.id));
              }}
            />
          )
        }
      </TableCard>
      <ButtonGroup>
        <StyledButton type='primary' size='large' onClick={handleVerifyPost}>Verify Advertisements</StyledButton>
      </ButtonGroup>
      {(!isLoading && !error) && (
        <AppPagination defaultCurrent={1} total={data.data.totalElements} onPageChangeHandler={onPageChangeHandle}
                       limit={dataSearch.limit} />
      )}
    </PageContainer>
  );
}

export default VerifyAds;