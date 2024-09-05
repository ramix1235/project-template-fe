import { useTranslation } from 'react-i18next';

import { ButtonLink, ButtonLinkProps } from '#/components/base';

const BackButton: React.FC<ButtonLinkProps> = (props) => {
  const { t } = useTranslation();

  return (
    <ButtonLink variant="light" {...props}>
      {t('common.back')}
    </ButtonLink>
  );
};

export default BackButton;
