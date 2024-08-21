import { AppShell, AppShellAsideProps, ElementProps } from '@mantine/core';
import { useTranslation } from 'react-i18next';

interface AsideProps extends AppShellAsideProps, ElementProps<'aside', keyof AppShellAsideProps> {}

const Aside: React.FC<AsideProps> = (props) => {
  const { t } = useTranslation();

  return (
    <AppShell.Aside p="md" {...props}>
      {t('aside.title')}
    </AppShell.Aside>
  );
};

export default Aside;
