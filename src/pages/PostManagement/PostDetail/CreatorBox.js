import styled from 'styled-components';
import { Avatar } from 'antd';
import moment from 'moment';

const Wrapper = styled.div`
  width: 100%;
  height: 70px;
  display: flex;

  > div {
    margin-left: 20px;

    p:first-child {
      font-weight: 600;
      font-size: 16px;
      margin-bottom: 10px;
    }
  }
`;
const CreatorBox = ({ item }) => {
  return (
    <Wrapper>
      <Avatar src={item.creator.avatar || '/assets/images/default-avatar.jpg'} size={60} />
      <div>
        <p>{item.creator.fullName}</p>
        <p>{moment(item.createdAt, 'YYYY-MM-DD[T]hh:mm:ssZ').format("DD/MM/YYYY hh:mm")}</p>
      </div>
    </Wrapper>
  );
};

export default CreatorBox;