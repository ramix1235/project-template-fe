import {
  ElementProps,
  MantineColorScheme,
  Select,
  SelectProps,
  useMantineColorScheme,
} from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface ThemeSelectProps extends SelectProps, ElementProps<'input', keyof SelectProps> {}

const ThemeSelect: React.FC<ThemeSelectProps> = (props) => {
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
