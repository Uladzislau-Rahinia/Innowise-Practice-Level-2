import { combineReducers } from '@reduxjs/toolkit';
import postsFeedReducer from 'redux/slices/PostFeedSlice';
import paintReducer from 'redux/slices/PaintSlice';
import userReducer from 'redux/slices/UserSlice';

const rootReducer = combineReducers({
  postsFeed: postsFeedReducer,
  paint: paintReducer,
  userData: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
