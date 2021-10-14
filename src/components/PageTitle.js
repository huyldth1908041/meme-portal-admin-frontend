import styled from 'styled-components';

const CustomTitle = styled.h1`
  font-size: 30px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #fff;
`;
const PageTitle = ({ children }) => {
  return <CustomTitle>{children}</CustomTitle>;
};

export default PageTitle;