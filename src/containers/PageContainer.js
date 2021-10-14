import styled from 'styled-components';

const PageWrapper = styled.div`
  color: #fff;
  width: 100%;
  padding: 10px;
`;
const PageContainer = ({ children }) => {
  return <PageWrapper>{children}</PageWrapper>;
};
export default PageContainer;