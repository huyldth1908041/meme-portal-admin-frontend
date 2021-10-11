import styled from 'styled-components';
import { CustomTable } from '../../../components';
import { verifyPostColumns } from './config';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { useState } from 'react';
import { Button, Skeleton } from 'antd';
import { toast } from 'react-hot-toast';

const Wrapper = styled.div`
  width: 100%;
  padding: 20px;
`;
const TableCard = styled.div`
  width: 100%;
  padding: 10px;
`;
const ButtonGroup = styled.div`
  display: flex;
  margin-top: 20px;
`;
const PageTitle = styled.h1`
  color: #fff;
`;
const StyledButton = styled(Button)`
  margin: 0 10px;
`;
const VerifyPost = () => {
  const [dataSearch] = useState({ status: 0, page: 1, limit: 10 });
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
          await refetch()
          resolve();
        }
      } catch (err) {
        reject(err);
      }
    });

    await toast.promise(verifyPostPromise, {
      loading: "Verifying...",
      error: (err) => `Verify failed ${err.message}`,
      success: () => `Verify success!`
    })
  };

  const listData = data?.data?.content.map(item => ({ ...item, key: item.id }));
  return (
    <Wrapper>
      <PageTitle>Verify Posts</PageTitle>
      <TableCard>
        {
          isLoading ? (
            <Skeleton />
          ) : (
            <CustomTable
              data={listData}
              columns={verifyPostColumns}
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
        <StyledButton type='primary' danger={true} size='large'>Delete Posts</StyledButton>
      </ButtonGroup>
    </Wrapper>
  );
};

export default VerifyPost;