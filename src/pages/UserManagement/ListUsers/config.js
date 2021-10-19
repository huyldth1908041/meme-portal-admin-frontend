import { Space } from 'antd';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { privateRoute } from '../../../routes';

export const userColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'username',
    dataIndex: 'username',
    key: 'username',
  },
  {
    title: 'Role',
    dataIndex: 'role',
    key: 'role',
  },
  {
    title: 'Full name',
    dataIndex: 'fullName',
    key: 'fullName',
  },
  {
    title: 'Phone',
    dataIndex: 'phone',
    key: 'phone',
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
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    render: status => (
      <p>{status > 0 ? 'active' : 'de-active'}</p>
    ),
  },
  {
    title: 'Action',
    key: 'action',
    render: (_, record) => (
      <Space size='middle'>
        {
          record.status > 0 && (
            <>
              <Link to={privateRoute.userDetail.url(record.id)}>
                <i className='bx bxs-info-circle' />
              </Link>
              <Link to={privateRoute.editUser.url(record.id)}>
                <i className='bx bxs-pencil' />
              </Link>
            </>
          )
        }
      </Space>
    ),
  },
];