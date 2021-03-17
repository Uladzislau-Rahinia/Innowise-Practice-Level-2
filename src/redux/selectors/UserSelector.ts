import { RootState } from 'app/rootReducer';
import { UserData } from 'core/utils/types';

const getUserData = (state: RootState): UserData => state.userData;

export default getUserData;
