import { createSlice, Reducer } from '@reduxjs/toolkit';

import { reducers, extraReducers } from './user.reducers';

export interface IUserState {
  address: string;
  balance: {
    eth: string;
    dai: string;
  };
}

const initialState: IUserState = {
  address: '',
  balance: {
    eth: '',
    dai: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers,
  extraReducers: (builder) => {},
});

// Action Creators

export const actions = {
  updateUserInfo: userSlice.actions.updateUserInfo,
};

export default userSlice.reducer as Reducer<IUserState>;
