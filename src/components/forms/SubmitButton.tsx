import { Button, ButtonProps, ElementProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface SubmitButtonProps extends ButtonProps, ElementProps<'button', keyof ButtonProps> {}

const SubmitButton: React.FC<SubmitButtonProps> = ({ children, ...reset }) => {
  const { t } = useTranslation();

  return (
    <Button type="submit" {...reset}>
      {children ?? t('common.send')}
    </Button>
  );
};

export default SubmitButton;
