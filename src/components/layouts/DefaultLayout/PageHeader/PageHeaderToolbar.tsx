import { Portal } from '@mantine/core';

import { PAGE_HEADER_TOOLBAR_ID } from '#/components';

const PageHeaderToolbar: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Portal target={`#${PAGE_HEADER_TOOLBAR_ID}`}>{children}</Portal>;
};

export default PageHeaderToolbar;
