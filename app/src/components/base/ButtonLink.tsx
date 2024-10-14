import { Button, ButtonProps } from '@mantine/core';
import { Link, LinkProps } from 'react-router-dom';

export interface ButtonLinkProps extends ButtonProps, Omit<LinkProps, keyof ButtonProps> {}

const ButtonLink: React.FC<ButtonLinkProps> = ({ children, ...props }) => {
  return (
    <Button component={Link} {...props}>
      {children}
    </Button>
  );
};

export default ButtonLink;
