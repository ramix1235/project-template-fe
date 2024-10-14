import { MantineColorScheme, Select, SelectProps, useMantineColorScheme } from '@mantine/core';
import { useTranslation } from 'react-i18next';

const ThemeSelect: React.FC<SelectProps> = (props) => {
  const { t } = useTranslation();
  const { setColorScheme, colorScheme } = useMantineColorScheme();

  const themes = [
    { label: t('theme.light'), value: 'light' },
    { label: t('theme.dark'), value: 'dark' },
    { label: t('theme.auto'), value: 'auto' },
  ];

  const handleChangeTheme = (value: string | null) => {
    if (!value) return;

    setColorScheme(value as MantineColorScheme);
  };

  return <Select value={colorScheme} data={themes} onChange={handleChangeTheme} {...props} />;
};

export default ThemeSelect;
