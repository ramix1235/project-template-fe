import { ElementProps, Group, Stack, GroupProps } from '@mantine/core';
import { clsx } from 'clsx';

import { PAGE_HEADER_TOOLBAR_ID } from '#/components';

import Breadcrumbs from './Breadcrumbs';
import CrumbBackButton from './CrumbBackButton';
import PageTitle from './PageTitle';

import classes from './PageHeader.module.scss';

interface PageHeaderProps extends GroupProps, ElementProps<'div', keyof GroupProps> {
  disabled?: boolean;
  withBorder?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className, withBorder = true, ...rest }) => {
  return (
    <Group
      wrap="nowrap"
      justify="space-between"
      className={clsx(classes.root, className)}
      mod={{ 'data-with-border': withBorder }}
      {...rest}
    >
      <Stack gap={0}>
        <Group wrap="nowrap">
          <CrumbBackButton />
          <PageTitle lineClamp={1} />
        </Group>
        <Breadcrumbs />
      </Stack>

      <Group id={PAGE_HEADER_TOOLBAR_ID} />
    </Group>
  );
};

export default PageHeader;
