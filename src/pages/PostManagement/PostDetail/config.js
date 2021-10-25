import { Avatar } from 'antd';
import moment from 'moment';

export const postLikeColumns = [
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Full name',
    dataIndex: 'fullName',
    key: 'fullName',
    render: (_, record) => (
      <>
        <Avatar src={record.avatar || '/assets/images/default-avatar.jpg'} />
        <span> {record.fullName}</span>
      </>
    ),
  },
  {
    title: 'Liked At',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => (
      <p>{moment(createdAt, 'YYYY-MM-DD[T]hh:mm:ssZ').format('DD-MM-YYYY HH:mm')}</p>
    ),
  },
];
export const postCommentColumns = [
  {
    title: 'commenter',
    dataIndex: 'user',
    key: 'user',
    render: (user) => (
      <>
        <Avatar src={user.avatar || '/assets/images/default-avatar.jpg'} />
        <span> {user.fullName}</span>
      </>
    ),
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Like',
    dataIndex: 'likeCount',
    key: 'likeCount',
  },
  {
    title: 'Reply',
    dataIndex: 'replyCount',
    key: 'replyCount',
  },
];