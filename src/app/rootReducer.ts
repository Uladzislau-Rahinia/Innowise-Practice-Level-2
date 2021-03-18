import { combineReducers } from '@reduxjs/toolkit';
import postsFeedReducer from 'redux/slices/PostFeedSlice';
import userReducer from 'redux/slices/UserSlice';

const rootReducer = combineReducers({
  postsFeed: postsFeedReducer,
  userData: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
