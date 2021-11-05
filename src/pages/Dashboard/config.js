import { Avatar } from 'antd';

export const topTokenColumns = [
  {
    title: 'User',
    dataIndex: 'user',
    key: 'user',
    render: creator => (
      <>
        <Avatar src={creator.avatar || '/assets/images/default-avatar.jpg'} />
        <span> {creator.fullName}</span>
      </>
    ),
  },
  {
    title: 'Token Balance',
    dataIndex: 'tokenBalance',
    key: 'tokenBalance',
    render: tokenBalance => (
      <span>
        {tokenBalance.toLocaleString()}
      </span>
    ),
  },
];
export const topCreatorColumns = [
  {
    title: 'Creator',
    dataIndex: 'user',
    key: 'user',
    render: creator => (
      <>
        <Avatar src={creator.avatar || '/assets/images/default-avatar.jpg'} />
        <span> {creator.fullName}</span>
      </>
    ),
  },
  {
    title: 'Post Created',
    dataIndex: 'postCounts',
    key: 'postCounts',
  },
];