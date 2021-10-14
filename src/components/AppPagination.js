import { Pagination } from 'antd';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  margin-top: 10px;
`;

const StyledPagination = styled(Pagination)`
  
  .ant-pagination-item-active {
    background-color: #f3956a;
    border: none;
  }
`
const AppPagination = ({defaultCurrent, total, onPageChangeHandler, limit}) => {
  return (
    <Wrapper>
      <StyledPagination defaultCurrent={defaultCurrent} total={total} onChange={onPageChangeHandler} pageSize={limit} />
    </Wrapper>
  );
};
export default AppPagination;