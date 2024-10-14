import { Portal, PortalProps } from '@mantine/core';

import { PAGE_HEADER_TOOLBAR_ID } from '#/components';

const PageHeaderToolbar: React.FC<PortalProps> = ({ children, ...props }) => {
  return (
    <Portal target={`#${PAGE_HEADER_TOOLBAR_ID}`} {...props}>
      {children}
    </Portal>
  );
};

export default PageHeaderToolbar;
