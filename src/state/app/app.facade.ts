import { useAppDispatch, useAppSelector } from 'state';

export const useAppFacade = () => {
  const dispatch = useAppDispatch();

  const appEnv = useAppSelector((state) => state.appState.env);

  return {
    appEnv,
  };
};
