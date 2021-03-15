import React, { useEffect, useState } from 'react';
import Button from 'core/components/Button/Button';
import ButtonLink from 'core/components/Link';
import LINKS from 'core/utils/constants/links';
import { logoutUser } from 'core/services/firebaseAuthQueries';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { fetchPosts } from './Slices/PostFeedSlice';
import { TodoListWrapper, ButtonWrapper } from './styles';
import PostsFeed from './components/PostsFeed';

const HomePage:React.FC = () => {
  const history = useHistory();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);

  const handleLogOut = async () => {
    await logoutUser();
    history.push(LINKS.LOGIN);
  };

  return (
    <TodoListWrapper>
      <ButtonWrapper>
        <ButtonLink
          to={LINKS.PAINT}
          text="+ New painting"
        />
        <Button onClick={handleLogOut} text="Log Out" />
      </ButtonWrapper>
      <PostsFeed />
    </TodoListWrapper>
  );
};

export default HomePage;
