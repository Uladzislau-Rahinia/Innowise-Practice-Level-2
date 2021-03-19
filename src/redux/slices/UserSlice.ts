import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { createUser, getUsername } from 'core/services/firebaseDBQueries';
import {
  loginUser, logoutUser, registerUser,
} from 'core/services/firebaseAuthQueries';
import { UserData } from 'core/utils/types';

export const signUp = createAsyncThunk('user/signUp',
  async ({ email, password, username }:{email:string, password:string, username:string}) => {
    const registerRes = await registerUser(email, password);
    await createUser(registerRes, username);
    return { uid: registerRes, username };
  });

export const signIn = createAsyncThunk('user/signIn',
  async ({ email, password }: {email:string, password:string}) => {
    const loginRes = await loginUser(email, password);
    const usernameRes = await getUsername(loginRes);
    return { uid: loginRes, username: usernameRes };
  });

export const signInCheck = createAsyncThunk('user/signInCheck',
  async (uid:string | undefined) => {
    if (uid) {
      const usernameRes = await getUsername(uid);
      return { uid, username: usernameRes };
    }
    throw new Error();
  });

export const logOut = createAsyncThunk('user/logOut', async () => {
  await logoutUser();
});

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    uid: '',
    username: '',
    isLoggedIn: false,
    isPending: true,
    isError: false,
    errorMessage: '',
  } as UserData,
  reducers: {
    clearState(state) {
      return { ...state, isError: false, isPending: false };
    },
  },
  extraReducers: {
    [signIn.fulfilled.toString()]: (state, action) => ({
      ...state, uid: action.payload.uid, username: action.payload.username, isLoggedIn: true,
    }),
    [signIn.rejected.toString()]: (state, action) => ({
      ...state, isError: true, errorMessage: action.error.message,
    }),
    [signUp.fulfilled.toString()]: (state, action) => ({
      ...state, uid: action.payload.uid, username: action.payload.username, isLoggedIn: true,
    }),
    [signUp.rejected.toString()]: (state, action) => ({
      ...state, isError: true, errorMessage: action.error.message,
    }),
    [logOut.fulfilled.toString()]: (state) => ({
      ...state, isLoggedIn: false,
    }),
    [signInCheck.fulfilled.toString()]: (state, action) => ({
      ...state,
      uid: action.payload.uid,
      username: action.payload.username,
      isLoggedIn: true,
      isPending: false,
    }),
    [signInCheck.rejected.toString()]: (state) => ({
      ...state, isPending: false,
    }),
    [signInCheck.pending.toString()]: (state) => ({ ...state, isPending: true }),
  },
});

export const { clearState } = userSlice.actions;

export default userSlice.reducer;
