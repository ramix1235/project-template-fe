import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { useGoBack } from '#/services/navigation';

export interface BackButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

const BackButton: React.FC<BackButtonProps> = ({ onClick, ...props }) => {
  const { t } = useTranslation();
  const { canGoBack, goBack } = useGoBack();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    goBack();

    onClick?.(e);
  };

  return (
    <Button variant="light" disabled={!canGoBack} onClick={handleClick} {...props}>
      {t('common.back')}
    </Button>
  );
};

export default BackButton;
