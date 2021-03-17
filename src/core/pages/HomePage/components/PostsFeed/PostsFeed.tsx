import React, { useMemo } from 'react';
import { useSelector, useStore } from 'react-redux';
import getPosts from 'redux/selectors/PostFeedSelector';
import { formatDistance, compareDesc } from 'date-fns';
import { FeedWrapper, PostItem } from './styles';

const PostsFeed = (): JSX.Element => {
  const posts = useSelector(getPosts);
  const postItems = useMemo(
    () => posts.slice()
      .sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
      .map((post) => (
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
              {formatDistance(new Date(Date.now()), new Date(post.date))}
              {' '}
              ago
            </span>
          </div>
        </PostItem>
      )),
    [posts],
  );
  return <FeedWrapper>{postItems}</FeedWrapper>;
};
export default PostsFeed;
