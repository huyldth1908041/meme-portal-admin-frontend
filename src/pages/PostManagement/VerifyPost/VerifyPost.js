import styled from 'styled-components';
import { AppPagination, CustomTable, PageTitle } from '../../../components';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { useState } from 'react';
import { Button, Skeleton } from 'antd';
import { toast } from 'react-hot-toast';
import { PageContainer } from '../../../containers';
import { postColumns } from '../ListPost/config';


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
const VerifyPost = () => {
  const [dataSearch, setDataSearch] = useState({ status: 0, page: 1, limit: 10 });
  const [selectedIds, setSelectedIds] = useState([]);
  const { data = {}, isLoading, refetch } = useQuery(['memeServices.searchMemes', dataSearch],
    ({ queryKey }) => memeServices.searchMemes(queryKey[1]),
    {
      keepPreviousData: true,
    });
  const handleRowSelectionChange = (postIds) => {
    setSelectedIds(postIds);
  };
  const handleVerifyPost = async () => {
    if (selectedIds.length === 0) {
      toast.error('Please select post to verify');
      return;
    }
    const verifyPostPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await memeServices.verifyPosts({ postIds: selectedIds });
        if (res.status === 200) {
          await refetch();
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });

    await toast.promise(verifyPostPromise, {
      loading: 'Verifying...',
      error: (err) => `Verify failed ${err.message}`,
      success: () => `Verify success!`,
    });
  };

  const handleDeletePosts = async () => {
    if (selectedIds.length === 0) {
      toast.error('Please select post to delete');
      return;
    }
    const deletePostPromise = new Promise(async (resolve, reject) => {
      try {
        const res = await memeServices.deletePosts({ data: { postIds: selectedIds } });
        if (res.status === 200) {
          await refetch();
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });

    await toast.promise(deletePostPromise, {
      loading: 'Deleting...',
      error: (err) => `Delete failed ${err.message}`,
      success: () => `Delete success!`,
    });
  };

  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };

  const listData = data?.data?.content.map(item => ({ ...item, key: item.id }));
  return (
    <PageContainer>
      <PageTitle>Verify Posts</PageTitle>
      <TableCard>
        {
          isLoading ? (
            <Skeleton />
          ) : (
            <CustomTable
              data={listData}
              columns={postColumns}
              // width='100%'
              selectionType='checkbox'
              onRowSelectionChange={handleRowSelectionChange}
              // renderTitle={<h1>Need verify posts</h1>}
            />
          )
        }
      </TableCard>
      <ButtonGroup>
        <StyledButton type='primary' size='large' onClick={handleVerifyPost}>Verify Posts</StyledButton>
        <StyledButton type='primary' danger={true} size='large' onClick={handleDeletePosts}>Delete Posts</StyledButton>
      </ButtonGroup>
      {!isLoading && (
        <AppPagination defaultCurrent={1} total={data.data.totalElements} onPageChangeHandler={onPageChangeHandle}
                       limit={dataSearch.limit} />
      )}
    </PageContainer>
  );
};

export default VerifyPost;