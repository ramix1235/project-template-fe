/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Title, TitleProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useLocation, useMatches } from 'react-router-dom';

/*
  PageTitle uses useMatches hook to pass props and take title component from the handle section in the route.

  About useMatches: https://reactrouter.com/en/main/hooks/use-matches
*/

// Normalizer removes slashes at the end of pathname
const normalizePathname = (pathname: string) => pathname.replace(/\/+$/, '');

const PageTitle: React.FC<TitleProps> = (props) => {
  const { t } = useTranslation();

  const matches = useMatches();
  const location = useLocation();

  const currentRoute = matches
    // @ts-ignore
    .filter((match) => Boolean(match.handle?.title))
    .find((match) => normalizePathname(match.pathname) === normalizePathname(location.pathname));

  // @ts-ignore
  return currentRoute?.handle?.title ? (
    // @ts-ignore
    <Title {...props}>{currentRoute.handle.title(t)}</Title>
  ) : null;
};

export default PageTitle;
