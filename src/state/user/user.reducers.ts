import { IUserState } from './user.slice';

// Reducers
export const reducers = {
  updateUserInfo(state: IUserState, action: any) {
    const newState = { ...state, ...action.payload };
    return newState;
  },
};

export const extraReducers = {};
