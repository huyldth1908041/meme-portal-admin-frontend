import { Avatar, Image, Space } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { privateRoute } from '../../../routes';

export const postColumns = [
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
    title: 'Category',
    dataIndex: 'category',
    key: 'category',
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
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        <Link to={privateRoute.postDetail.url(record.id)} onClick={(event) => event.stopPropagation()}>
          <i className='bx bxs-info-circle' />
        </Link>
        <Link to={privateRoute.editPost.url(record.id)} onClick={(event) => event.stopPropagation()}>
          <i className='bx bxs-pencil' />
        </Link>
      </Space>
    ),
  },
];