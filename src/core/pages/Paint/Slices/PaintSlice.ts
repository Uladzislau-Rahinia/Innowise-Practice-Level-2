import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { addNewPost } from 'core/services/firebaseDBQueries';
import { saveImage } from 'core/services/firebaseStorageQueries';
import { Post } from 'core/utils/types';

export const add = createAsyncThunk('postsFeed/addNewPost', async ({ newPost, route }:{newPost:Post, route:string}) => {
  const res = await addNewPost(newPost, route);
  return res;
});

export const save = createAsyncThunk('postsFeed/saveImage', async ({ data, uid }:{data:string, uid:string}) => {
  const res = await saveImage(data, uid);
  return res;
});

export const PaintSlice = createSlice({
  name: 'paint',
  initialState: {},
  reducers: {
    // setPosts(state, action: PayloadAction<Post[]>) {
    //   // action.payload.map((farmerMap) => state.push(farmerMap));
    // },
  },
  extraReducers: {
    [add.fulfilled.toString()]: (state, action) => {
      // action.payload.map((postsFeed) => state.push(postsFeed));
      console.log(action.payload);
    },
    [save.fulfilled.toString()]: (state, action) => {
      // action.payload.map((postsFeed) => state.push(postsFeed));
      console.log(action.payload);
    },
  },
});

export default PaintSlice.reducer;
