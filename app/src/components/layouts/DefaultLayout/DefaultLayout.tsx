import { useEffect } from 'react';

import {
  AppShell,
  AppShellAsideConfiguration,
  AppShellFooterConfiguration,
  AppShellHeaderConfiguration,
  AppShellNavbarConfiguration,
  AppShellProps,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { clsx } from 'clsx';
import { useLocation } from 'react-router-dom';

import Aside from './Aside';
import Footer from './Footer';
import Header from './Header';
import Main from './Main';
import Navbar from './Navbar';
import { PageHeader } from './PageHeader';

import classes from './DefaultLayout.module.scss';

const headerConfig: AppShellHeaderConfiguration = { height: 60 };
const navbarConfig: AppShellNavbarConfiguration = {
  width: 300,
  breakpoint: 'md',
};
const asideConfig: AppShellAsideConfiguration = {
  width: 300,
  breakpoint: 'md',
  collapsed: { mobile: true },
};
const footerConfig: AppShellFooterConfiguration = { height: 60 };

export interface DefaultLayoutProps extends AppShellProps {
  disabledHeader?: boolean;
  disabledPageHeader?: boolean;
  disabledNavbar?: boolean;
  disabledAside?: boolean;
  disabledFooter?: boolean;
  centered?: boolean;
  pageHeader?: React.ReactNode | null;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({
  children,
  disabled = false,
  disabledHeader = false,
  disabledPageHeader = false,
  disabledNavbar = false,
  disabledAside = false,
  disabledFooter = false,
  centered = false,
  ...props
}) => {
  const location = useLocation();

  const theme = useMantineTheme();
  const largerThanMd = useMediaQuery(`(min-width: ${theme.breakpoints.md})`);

  const [openedBurgerMenu, { toggle: toggleBurgerMenu }] = useDisclosure();

  // Close Navbar on location changing
  useEffect(() => {
    if (openedBurgerMenu) {
      toggleBurgerMenu();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  // Close Navbar on resize starting from md
  useEffect(() => {
    if (openedBurgerMenu && largerThanMd) {
      toggleBurgerMenu();
    }
  }, [openedBurgerMenu, largerThanMd, toggleBurgerMenu]);

  return (
    <AppShell
      padding="md" // Padding for Main
      className={clsx(classes.root, {
        [classes.disabled_header]: disabledHeader,
        [classes.disabled_page_header]: disabledPageHeader,
        [classes.disabled_navbar]: disabledNavbar,
        [classes.disabled_aside]: disabledAside,
        [classes.disabled_footer]: disabledFooter,
      })}
      header={headerConfig}
      navbar={{
        ...navbarConfig,
        collapsed: { mobile: !openedBurgerMenu },
      }}
      aside={asideConfig}
      footer={footerConfig}
      disabled={disabled}
      {...props}
    >
      {!disabledHeader && (
        <Header
          disabledNavbar={disabledNavbar}
          openedBurgerMenu={openedBurgerMenu}
          toggleBurgerMenu={toggleBurgerMenu}
        />
      )}

      {!disabledNavbar && <Navbar enabledRemoveScroll={openedBurgerMenu} />}

      {!disabled && !disabledPageHeader && <PageHeader />}

      <Main className={classes.main} centered={centered}>
        {children}
      </Main>

      {!disabledAside && <Aside />}

      {!disabledFooter && <Footer />}
    </AppShell>
  );
};

export default DefaultLayout;
