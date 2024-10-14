import { Button, ButtonProps, ElementProps } from '@mantine/core';

import { DEFAULT_ICON_SIZE } from '#/components';

import GoogleLogo from '#/assets/google.svg?react';

interface GoogleButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

const GoogleButton: React.FC<GoogleButtonProps> = (props) => {
  return (
    <Button
      variant="default"
      leftSection={<GoogleLogo width={DEFAULT_ICON_SIZE} height={DEFAULT_ICON_SIZE} />}
      {...props}
    />
  );
};

export default GoogleButton;
