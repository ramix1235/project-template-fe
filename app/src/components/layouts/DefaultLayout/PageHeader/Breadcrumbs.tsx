/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  BreadcrumbsProps as MantineBreadcrumbsProps,
  Breadcrumbs as MantineBreadcrumbs,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useMatches } from 'react-router-dom';

import { AnchorLink } from '#/components/base';

/*
  Breadcrumbs uses useMatches hook to pass props and take crumb component from the handle section in the route.

  Official example: https://reactrouter.com/en/main/hooks/use-matches#breadcrumbs
*/

const Breadcrumbs: React.FC<Omit<MantineBreadcrumbsProps, 'children'>> = (props) => {
  const { t } = useTranslation();

  const matches = useMatches();
  const crumbs = matches
    // @ts-ignore
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => (
      <AnchorLink key={match.id} size="xs" c="dimmed" to={match.pathname}>
        {/* @ts-ignore */}
        {match.handle.crumb(t)}
      </AnchorLink>
    ));

  return <MantineBreadcrumbs {...props}>{crumbs}</MantineBreadcrumbs>;
};

export default Breadcrumbs;
