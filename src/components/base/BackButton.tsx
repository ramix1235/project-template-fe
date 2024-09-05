import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { To } from 'react-router-dom';

import { MAIN_ROUTES, useGoBack } from '#/services/navigation';

interface BackButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {
  fallbackTo?: To;
}

const BackButton: React.FC<BackButtonProps> = ({
  fallbackTo = MAIN_ROUTES.HOME,
  onClick,
  ...props
}) => {
  const { t } = useTranslation();
  const { goBack } = useGoBack();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    goBack(fallbackTo);

    onClick?.(e);
  };

  return (
    <Button variant="light" onClick={handleClick} {...props}>
      {t('common.back')}
    </Button>
  );
};

export default BackButton;
