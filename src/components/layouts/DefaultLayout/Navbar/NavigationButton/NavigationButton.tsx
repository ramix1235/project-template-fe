import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { clsx } from 'clsx';
import { NavLink, NavLinkProps, NavLinkRenderProps } from 'react-router-dom';

import classes from './NavigationButton.module.scss';

interface BackButtonProps
  extends ButtonProps,
    ElementProps<'a', keyof ButtonProps>,
    Pick<NavLinkProps, 'to'> {}

const NavigationButtonRoot: React.FC<BackButtonProps> = ({ className, style, ...navLinkProps }) => {
  const getClassName = ({ isActive }: NavLinkRenderProps) => {
    return clsx(classes.nav_link, { [classes.active]: isActive }, className);
  };

  return (
    <NavLink className={getClassName} style={style as React.CSSProperties} {...navLinkProps} />
  );
};

const NavigationButton: React.FC<BackButtonProps> = ({ children, ...rest }) => {
  return (
    <Button
      component={NavLink}
      renderRoot={NavigationButtonRoot}
      fullWidth
      px="xs"
      justify="start"
      variant="light"
      {...rest}
    >
      {children}
    </Button>
  );
};

export default NavigationButton;
