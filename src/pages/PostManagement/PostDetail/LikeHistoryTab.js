import { AppPagination, CustomTable } from '../../../components';
import { postLikeColumns } from './config';
import { useQuery } from 'react-query';
import { useState } from 'react';
import memeServices from '../../../services/memeServices';
import { Skeleton } from 'antd';

const LikeHistoryTab = ({ postId }) => {
  const [dataSearch, setDataSearch] = useState({ page: 1, limit: 10 });
  const { data = {}, isLoading, error } = useQuery(['memeServices.fetchLikedList', dataSearch],
    ({ queryKey }) => memeServices.fetchLikedList(postId, queryKey[1]),
    {
      keepPreviousData: true,
    });
  const { data: { likedList: { content: listUsers = [] } = {} } = {} } = data;
  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };

  return (
    <>
      {
        isLoading ? (<Skeleton />) : error ? (<p>Somme error has occurred</p>) : (
          <CustomTable
            columns={postLikeColumns}
            data={listUsers.map(item => ({ ...item, key: item.id }))}
          />

        )
      }
      {(!isLoading && !error) && (
        <AppPagination defaultCurrent={1} total={data.data.likedList.totalElements}
                       onPageChangeHandler={onPageChangeHandle}
                       limit={dataSearch.limit} />
      )}
    </>
  );
};

export default LikeHistoryTab;