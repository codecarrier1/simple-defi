import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import appReducer from './app/app.slice';
import userReducer from './user/user.slice';

export const store = configureStore({
  reducer: {
    appState: appReducer,
    userState: userReducer,
  },
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: ['user/updateUserInfo'],
      ignoredPaths: ['userState.balance.dai', 'payload.balance.dai'],
    },
  }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
