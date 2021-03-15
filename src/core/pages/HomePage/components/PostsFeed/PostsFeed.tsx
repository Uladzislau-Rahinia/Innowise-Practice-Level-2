import React, { useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import getPosts from 'core/pages/HomePage/Selectors/PostFeedSelector';
import { getImage } from 'core/services/firebaseStorageQueries';
import { FeedWrapper, PostItem } from './styles';

const PostsFeed = ():JSX.Element => {
  const posts = useSelector(getPosts);
  const postItems = useMemo(() => posts.map((post) => (
    <PostItem>
      <img src={post.path} alt="" />
      <div>
        <span>
          Author:
          {' '}
          {post.author}
        </span>
        <span>
          Date:
          {' '}
          {post.date}
        </span>
      </div>
    </PostItem>
  )), [posts]);
  return (
    <FeedWrapper>
      {postItems}
    </FeedWrapper>
  );
};
export default PostsFeed;
