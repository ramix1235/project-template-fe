/* eslint-disable @typescript-eslint/ban-ts-comment */

import {
  BreadcrumbsProps as MantineBreadcrumbsProps,
  Breadcrumbs as MantineBreadcrumbs,
  ElementProps,
  Anchor,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link, useMatches } from 'react-router-dom';

/*
  Breadcrumbs uses useMatches hook to pass props and take crumb component from the handle section in the route.

  Official example: https://reactrouter.com/en/main/hooks/use-matches#breadcrumbs
*/

interface BreadcrumbsProps
  extends Omit<MantineBreadcrumbsProps, 'children'>,
    ElementProps<'div', keyof MantineBreadcrumbsProps> {}

const Breadcrumbs: React.FC<BreadcrumbsProps> = (props) => {
  const { t } = useTranslation();

  const matches = useMatches();
  const crumbs = matches
    // @ts-ignore
    .filter((match) => Boolean(match.handle?.crumb))
    .map((match) => (
      <Anchor key={match.id} component={Link} size="xs" c="dimmed" to={match.pathname}>
        {/* @ts-ignore */}
        {match.handle.crumb(t)}
      </Anchor>
    ));

  return <MantineBreadcrumbs {...props}>{crumbs}</MantineBreadcrumbs>;
};

export default Breadcrumbs;
