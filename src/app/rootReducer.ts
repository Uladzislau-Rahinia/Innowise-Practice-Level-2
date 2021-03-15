import { combineReducers } from '@reduxjs/toolkit';
import postsFeedReducer from 'core/pages/HomePage/Slices/PostFeedSlice';
import paintReducer from 'core/pages/Paint/Slices/PaintSlice';

const rootReducer = combineReducers({
  postsFeed: postsFeedReducer,
  paint: paintReducer,
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;
