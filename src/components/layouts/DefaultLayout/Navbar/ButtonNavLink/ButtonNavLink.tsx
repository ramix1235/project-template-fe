import { Button, ButtonProps } from '@mantine/core';
import { clsx } from 'clsx';
import { NavLink, NavLinkProps, NavLinkRenderProps } from 'react-router-dom';

import classes from './ButtonNavLink.module.scss';

// ButtonProps uses MantineStyleProp type for style prop, but to be safe to parse style we should use type from NavLinkProps
type UnstyledButtonProps = Omit<ButtonProps, 'style'>;

interface ButtonNavLinkProps
  extends UnstyledButtonProps,
    Omit<NavLinkProps, keyof UnstyledButtonProps> {}

const ButtonNavLinkRoot: React.FC<ButtonNavLinkProps> = ({ className, style, ...rest }) => {
  const getClassName = ({ isActive }: NavLinkRenderProps) => {
    return clsx(classes.nav_link, { [classes.active]: isActive }, className);
  };

  return <NavLink className={getClassName} style={style} {...rest} />;
};

const ButtonNavLink: React.FC<ButtonNavLinkProps> = ({ children, ...rest }) => {
  return (
    <Button
      component={NavLink}
      renderRoot={ButtonNavLinkRoot}
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

export default ButtonNavLink;
