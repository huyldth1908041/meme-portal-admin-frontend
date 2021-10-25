import { useState } from 'react';
import { useQuery } from 'react-query';
import memeServices from '../../../services/memeServices';
import { Skeleton } from 'antd';
import { AppPagination, CustomTable } from '../../../components';
import { postCommentColumns } from './config';

const CommentHistoryTab = ({ postId }) => {
  const [dataSearch, setDataSearch] = useState({ page: 1, limit: 10 });
  const { data = {}, isLoading, error } = useQuery(['memeServices.fetchCommentList', dataSearch],
    ({ queryKey }) => memeServices.fetchCommentList(postId, queryKey[1]),
    {
      keepPreviousData: true,
    });
  const { data: { content: listComments = [] } = {} } = data;
  const onPageChangeHandle = (page, pageSize) => {
    setDataSearch({ ...dataSearch, page: page });
  };
  return (
    <>
      {
        isLoading ? (<Skeleton />) : error ? (<p>Somme error has occurred</p>) : (
          <CustomTable
            columns={postCommentColumns}
            data={listComments.map(item => ({ ...item, key: item.id }))}
          />
        )
      }
      {(!isLoading && !error) && (
        <AppPagination defaultCurrent={1} total={data.data.totalElements} onPageChangeHandler={onPageChangeHandle}
                       limit={dataSearch.limit} />
      )}
    </>
  );
};

export default CommentHistoryTab;