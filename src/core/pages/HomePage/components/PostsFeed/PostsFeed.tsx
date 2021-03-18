import React, { useMemo, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import getPosts from 'redux/selectors/PostFeedSelector';
import { formatDistance, compareDesc } from 'date-fns';
import TextInput from 'core/components/styled/TextInput';
import { FeedWrapper, PostItem } from './styles';

const PostsFeed = (): JSX.Element => {
  const [filter, setFilter] = useState('');
  const posts = useSelector(getPosts);
  const postItems = useMemo(
    () => {
      const filteredPosts = filter === '' ? posts.slice()
        : posts.filter((value) => value.author.toLowerCase().includes(filter.toLowerCase()));
      return filteredPosts.sort((a, b) => compareDesc(new Date(a.date), new Date(b.date)))
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
        ));
    },
    [posts, filter],
  );
  return (
    <>
      <TextInput
        onChange={(e) => setFilter((e.target as HTMLInputElement).value)}
        value={filter}
        type="text"
        placeholder="Filter by user"
      />
      <FeedWrapper>{postItems}</FeedWrapper>
    </>
  );
};
export default PostsFeed;
