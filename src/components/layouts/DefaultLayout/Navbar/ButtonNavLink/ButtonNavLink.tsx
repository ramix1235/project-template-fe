import { Button, ButtonProps } from '@mantine/core';
import { clsx } from 'clsx';
import { NavLink, NavLinkProps, NavLinkRenderProps } from 'react-router-dom';

import classes from './ButtonNavLink.module.scss';

// ButtonProps uses MantineStyleProp type for style prop, but to be safe to parse style we should use type from NavLinkProps
type UnstyledButtonProps = Omit<ButtonProps, 'style'>;

interface ButtonNavLinkProps
  extends UnstyledButtonProps,
    Omit<NavLinkProps, keyof UnstyledButtonProps> {}

const ButtonNavLinkRoot: React.FC<ButtonNavLinkProps> = ({ className, style, ...props }) => {
  const getClassName = ({ isActive }: NavLinkRenderProps) => {
    return clsx({ [classes.active]: isActive }, className);
  };

  return <NavLink className={getClassName} style={style} {...props} />;
};

const ButtonNavLink: React.FC<ButtonNavLinkProps> = ({ children, ...props }) => {
  return (
    <Button
      component={NavLink}
      renderRoot={ButtonNavLinkRoot}
      variant="light"
      px="xs"
      justify="start"
      fullWidth
      {...props}
    >
      {children}
    </Button>
  );
};

export default ButtonNavLink;
