import { Avatar, Button, Space } from 'antd';
import moment from 'moment';
import memeServices from '../../services/memeServices';
import { toast } from 'react-hot-toast';

export const reportsColumns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: 'target id',
    dataIndex: 'targetId',
    key: 'targetId',
  },
  {
    title: 'Content',
    dataIndex: 'content',
    key: 'content',
  },
  {
    title: 'Reporter',
    dataIndex: 'reporter',
    key: 'reporter',
    render: creator => (
      <>
        <Avatar src={creator.avatar || '/assets/images/default-avatar.jpg'} />
        <span> {creator.fullName}</span>
      </>
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
        <Button type='primary' danger onClick={async (event) => {
          event.stopPropagation();
          try {
            await memeServices.deleteReport(record.id);
            window.location.reload();
            toast.success('delete success');
          } catch (err) {
            toast.error('delete failed');
          }
        }
        }>
          <i className='bx bx-trash' />
        </Button>
      </Space>
    ),
  },

];

