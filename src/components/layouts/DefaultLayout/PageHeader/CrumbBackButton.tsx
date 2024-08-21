/* eslint-disable @typescript-eslint/ban-ts-comment */

import { ActionIcon, ActionIconProps, ElementProps } from '@mantine/core';
import { IconChevronLeft } from '@tabler/icons-react';
import { useMatches, useNavigate } from 'react-router-dom';

/*
  CrumbBackButton uses useMatches hook to parse crumbs and take previous.

  About useMatches: https://reactrouter.com/en/main/hooks/use-matches
*/

interface CrumbBackButtonProps
  extends ActionIconProps,
    ElementProps<'button', keyof ActionIconProps> {}

const CrumbBackButton: React.FC<CrumbBackButtonProps> = (props) => {
  const navigate = useNavigate();

  const matches = useMatches();

  const crumbs = matches
    // @ts-ignore
    .filter((match) => Boolean(match.handle?.crumb));

  const handleClick = () => {
    const prevBreadcrumb = crumbs.at(-2);

    if (prevBreadcrumb) {
      navigate(prevBreadcrumb.pathname);
    }
  };

  if (crumbs.length <= 1) {
    return null;
  }

  return (
    <ActionIcon variant="default" onClick={handleClick} {...props}>
      <IconChevronLeft />
    </ActionIcon>
  );
};

export default CrumbBackButton;
