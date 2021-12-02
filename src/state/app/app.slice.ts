import { createSlice, Reducer } from '@reduxjs/toolkit';

import { reducers, extraReducers } from './app.reducers';

export interface IAppState {
  env: string;
}

const initialState: IAppState = {
  env: process.env.NEXT_PUBLIC_ENV ?? '',
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers,
  extraReducers: (builder) => {},
});

// Action Creators

export const actions = {};

export default appSlice.reducer as Reducer<IAppState>;
