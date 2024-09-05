import { Button, ButtonProps, ElementProps } from '@mantine/core';

import { DEFAULT_ICON_SIZE } from '#/components';

import FacebookLogo from '#/assets/facebook.svg?react';

interface FacebookButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

const FacebookButton: React.FC<FacebookButtonProps> = (props) => {
  return (
    <Button
      variant="default"
      leftSection={<FacebookLogo width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />}
      {...props}
    />
  );
};

export default FacebookButton;
