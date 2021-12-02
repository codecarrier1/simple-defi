import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from 'state';
import * as UserSlice from './user.slice';

export const useUserFacade = () => {
  const dispatch = useAppDispatch();

  const userState = useAppSelector((state) => state.userState);

  const updateUserInfo = useCallback(
    (payload) => dispatch(UserSlice.actions.updateUserInfo(payload)),
    [dispatch]
  );

  return {
    userState,
    updateUserInfo,
  };
};
