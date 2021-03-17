import React, { useEffect, useState } from 'react';
import Button from 'core/components/styled/Button';
import ButtonLink from 'core/components/styled/Link';
import LINKS from 'core/utils/constants/links';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from 'redux/slices/PostFeedSlice';
import getUserData from 'redux/selectors/UserSelector';
import { logOut } from 'redux/slices/UserSlice';
import { TodoListWrapper, ButtonWrapper } from './styles';
import PostsFeed from './components/PostsFeed';

const HomePage:React.FC = () => {
  const history = useHistory();

  const { isLoggedIn } = useSelector(getUserData);

  const dispatch = useDispatch();
  useEffect(() => {
    if (isLoggedIn) {
      dispatch(fetchPosts());
    } else {
      history.push(LINKS.LOGIN);
    }
  }, [isLoggedIn]);

  const handleLogOut = async () => {
    dispatch(logOut());
  };

  return (
    <TodoListWrapper>
      <ButtonWrapper>
        <ButtonLink to={LINKS.PAINT}>+ New painting</ButtonLink>
        <Button onClick={handleLogOut}>Log Out</Button>
      </ButtonWrapper>
      <PostsFeed />
    </TodoListWrapper>
  );
};

export default HomePage;
