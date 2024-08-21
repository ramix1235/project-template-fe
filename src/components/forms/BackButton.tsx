import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { Link, LinkProps } from 'react-router-dom';

interface BackButtonProps
  extends ButtonProps,
    ElementProps<'a', keyof ButtonProps>,
    Pick<LinkProps, 'to'> {}

const BackButton: React.FC<BackButtonProps> = (props) => {
  const { t } = useTranslation();

  return (
    <Button component={Link} variant="light" {...props}>
      {t('common.back')}
    </Button>
  );
};

export default BackButton;
