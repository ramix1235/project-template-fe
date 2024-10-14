import { Anchor, AnchorProps } from '@mantine/core';
import { Link, LinkProps } from 'react-router-dom';

export interface AnchorLinkProps extends AnchorProps, Omit<LinkProps, keyof AnchorProps> {}

const AnchorLink: React.FC<AnchorLinkProps> = ({ children, ...props }) => {
  return (
    <Anchor component={Link} {...props}>
      {children}
    </Anchor>
  );
};

export default AnchorLink;
