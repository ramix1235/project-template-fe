import { ElementProps, Group, Stack, StackProps } from '@mantine/core';
import { clsx } from 'clsx';

import Breadcrumbs from './Breadcrumbs';
import CrumbBackButton from './CrumbBackButton';
import PageTitle from './PageTitle';

import classes from './PageHeader.module.scss';

interface PageHeaderProps extends StackProps, ElementProps<'div', keyof StackProps> {
  disabled?: boolean;
  withBorder?: boolean;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className, withBorder = true, ...rest }) => {
  return (
    <Stack
      className={clsx(classes.root, className)}
      mod={{ 'data-with-border': withBorder }}
      {...rest}
    >
      <Group h="100%">
        <Stack gap="xs">
          <Group wrap="nowrap">
            <CrumbBackButton />
            <PageTitle lineClamp={1} />
          </Group>
          <Breadcrumbs />
        </Stack>
      </Group>
    </Stack>
  );
};

export default PageHeader;
