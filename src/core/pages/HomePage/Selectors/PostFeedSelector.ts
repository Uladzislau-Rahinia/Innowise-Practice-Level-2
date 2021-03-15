import { RootState } from 'app/rootReducer';
import { Post } from 'core/utils/types';

const getPosts = (state: RootState): Post[] => state.postsFeed;

export default getPosts;
