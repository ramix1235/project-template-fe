import { AppShell, AppShellAsideProps } from '@mantine/core';
import { clsx } from 'clsx';
import { useTranslation } from 'react-i18next';

import classes from './Aside.module.scss';

const Aside: React.FC<AppShellAsideProps> = ({ className, ...props }) => {
  const { t } = useTranslation();

  return (
    <AppShell.Aside className={clsx(classes.root, className)} {...props}>
      {t('aside.title')}
    </AppShell.Aside>
  );
};

export default Aside;
