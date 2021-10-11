import { Avatar, Image } from 'antd';
import moment from 'moment';

export const verifyPostColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'Title',
    dataIndex: 'title',
    key: 'title',
  },
  {
    title: 'Creator',
    dataIndex: 'creator',
    key: 'creator',
    render: creator => (
      <>
      <Avatar src={creator.avatar || '/assets/images/default-avatar.jpg'} />
        <span> {creator.fullName}</span>
      </>
    ),
  },
  {
    title: 'Image',
    dataIndex: 'image',
    key: 'image',
    render: image => (
      <Image src={image} width={50} height={50} />
    ),
  },
  {
    title: 'Create time',
    dataIndex: 'createdAt',
    key: 'createdAt',
    render: createdAt => (
      <p>{moment(createdAt, 'YYYY-MM-DD[T]hh:mm:ssZ').fromNow()}</p>
    ),
  },
];