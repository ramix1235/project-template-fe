/* eslint-disable @typescript-eslint/ban-ts-comment */

import { AppShell, AppShellMainProps } from '@mantine/core';
import { clsx } from 'clsx';
import { useLocation, useMatches } from 'react-router-dom';

import classes from './Main.module.scss';

/*
  Main uses useMatches hook to take centered flag from the handle section in the route.

  About useMatches: https://reactrouter.com/en/main/hooks/use-matches
*/

interface MainProps extends AppShellMainProps {
  centered?: boolean;
}

const Main: React.FC<MainProps> = ({ children, className, centered = false, ...rest }) => {
  const matches = useMatches();
  const location = useLocation();

  const currentRoute = matches
    // @ts-ignore
    .filter((match) => match.handle && 'centered' in match.handle)
    .find((match) => match.pathname.includes(location.pathname));

  return (
    <AppShell.Main
      className={clsx(
        classes.root,
        // @ts-ignore
        { [classes.centered]: currentRoute?.handle?.centered ?? centered },
        className,
      )}
      {...rest}
    >
      {children}
    </AppShell.Main>
  );
};

export default Main;
