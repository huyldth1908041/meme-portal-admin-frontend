import { Avatar } from 'antd';
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
const Wrapper = styled.div`
  width: 350px;
  display: flex;
  max-height: 100px;
  align-items: center;
  padding: 10px;
  position: relative;
  color: #fff;
`;
const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
  align-items: center;
  color: #fff;
  &:hover {
    color: #fff;
    text-decoration: none;
  }
`;
const NotificationContent = styled.div`
  margin-left: 10px;
  max-width: 240px;
  white-space: pre-wrap;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3; // số dòng muốn hiển thị
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;
const ActiveDote = styled.span`
  display: block;
  position: absolute;
  width: 10px;
  height: 10px;
  background: green;
  border-radius: 50%;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
`

const NotificationItem = ({item, onNotificationClick}) => {
  return(
    <Wrapper onClick={ async (e) => await onNotificationClick(e, item)}>
      {item.url ? (
        <StyledLink to={item.url}>
          <Avatar src={item.thumbnail} size={50} />
          <NotificationContent>{item.content}</NotificationContent>
          {item.status > 0 && <ActiveDote/>}
        </StyledLink>
      ) : (
        <>
          <Avatar src={item.thumbnail} size={50} />
          <NotificationContent>{item.content}</NotificationContent>
          {item.status > 0 && <ActiveDote/>}
        </>
      )}
    </Wrapper>
  )
}

export default NotificationItem;