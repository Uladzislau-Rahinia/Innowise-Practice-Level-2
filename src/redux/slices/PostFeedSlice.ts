import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import { addNewPost, getPosts } from 'core/services/firebaseDBQueries';
import { saveImage, getImage } from 'core/services/firebaseStorageQueries';
import { Post } from 'core/utils/types';

export const fetchPosts = createAsyncThunk('postsFeed/fetchPosts', async () => {
  const res = await getPosts('posts');
  return res;
});

export const savePost = createAsyncThunk('postsFeed/savePost',
  async ({ img, uid, username }: {img:string, uid:string, username:string}) => {
    const imgPath = await saveImage(img, uid);
    const imgURL = await getImage(imgPath);
    const newPost = { path: imgURL, author: username, date: new Date(Date.now()).toString() };
    await addNewPost(newPost, 'posts');
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
    [fetchPosts.fulfilled.toString()]: (state, action:PayloadAction<Post>) => (
      Object.entries(action.payload).map((postsFeed) => postsFeed[1])
    ),
    [fetchPosts.rejected.toString()]: (state, action) => {
      // action.payload.map((postsFeed) => state.push(postsFeed));
      console.log(action);
    },
  },
});

export default PostsFeedSlice.reducer;
