import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { getPosts } from 'core/services/firebaseDBQueries';
import { Post } from 'core/utils/types';

export const fetchPosts = createAsyncThunk('postsFeed/fetchPosts', async () => {
  const res = await getPosts('posts');
  return res;
});

export const PostsFeedSlice = createSlice({
  name: 'postsFeed',
  initialState: [] as Post[],
  reducers: {
    // setPosts(state, action: PayloadAction<Post[]>) {
    //   // action.payload.map((farmerMap) => state.push(farmerMap));
    // },
  },
  extraReducers: {
    [fetchPosts.fulfilled.toString()]: (state, action:PayloadAction<Post>) => {
      Object.entries(action.payload).map((postsFeed) => state.push(postsFeed[1]));
    },
    [fetchPosts.rejected.toString()]: (state, action) => {
      // action.payload.map((postsFeed) => state.push(postsFeed));
      console.log(action);
    },
  },
});

export default PostsFeedSlice.reducer;
