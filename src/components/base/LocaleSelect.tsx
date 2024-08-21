import { ElementProps, Select, SelectProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

import { Locale, setLocale } from '#/services/internationalization';

interface LocaleSelectProps extends SelectProps, ElementProps<'input', keyof SelectProps> {}

const LocaleSelect: React.FC<LocaleSelectProps> = (props) => {
  const { t, i18n } = useTranslation();

  const locales = [
    { label: t('locale.en'), value: Locale.EN },
    { label: t('locale.fr'), value: Locale.FR },
  ];

  const handleChangeLocale = (value: string | null) => {
    if (!value) return;

    setLocale(value as Locale);
  };

  return <Select value={i18n.language} data={locales} onChange={handleChangeLocale} {...props} />;
};

export default LocaleSelect;
