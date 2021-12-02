import { ReactNode, FC, useEffect } from 'react';

import { useUserFacade } from 'state';

type LayoutProps = {
  children: ReactNode;
};

export const Layout: FC<LayoutProps> = ({ children }) => {
  const { updateUserInfo, userState } = useUserFacade();

  return (
    <div className="page-layout flex flex-col justify-between">{children}</div>
  );
};
