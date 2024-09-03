import { useLayoutEffect, useState } from 'react';

import { Anchor, Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { clsx } from 'clsx';
import { Trans, useTranslation } from 'react-i18next';

import { PageHeaderToolbar, PageLoader } from '#/components/layouts';
import { useMockGetCountQuery, useMockPostCountUpdateMutation } from '#/mocks/api';

import QueryPlayground from './QueryPlayground';

import viteLogo from '/vite.svg';
import ReactLogo from '#/assets/react.svg?react';

import classes from './Home.module.scss';

// TODO: Set your content for Home page

const Home: React.FC = () => {
  const { t } = useTranslation();

  const { data, isLoading: isGetCountLoading } = useMockGetCountQuery();
  const [updateCount, { isLoading: isUpdateCountLoading }] = useMockPostCountUpdateMutation();

  const [count, setCount] = useState(data?.count ?? 0);

  useLayoutEffect(() => {
    if (data?.count) {
      setCount(data.count);
    }
  }, [data]);

  const handleCountClick = async () => {
    const data = await updateCount({ count }).unwrap();

    setCount(data.count);
  };

  return (
    <>
      <PageHeaderToolbar>
        <Text lineClamp={1}>{t('pageHeader.toolbar')}</Text>
      </PageHeaderToolbar>

      <PageLoader loading={isGetCountLoading}>
        <Stack gap="xl">
          <Stack align="center">
            <Group>
              <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
                <Image src={viteLogo} className={classes.logo} alt="Vite" />
              </a>

              <a href="https://react.dev" target="_blank" rel="noreferrer">
                <ReactLogo className={clsx(classes.logo, classes.react)} />
              </a>
            </Group>

            <Title order={1} className={classes.title}>
              <Text
                inherit
                variant="gradient"
                component="span"
                gradient={{ from: 'var(--vite-brand-color)', to: 'var(--react-brand-color)' }}
              >
                {t('home.title')}
              </Text>
            </Title>

            <Stack p="xl">
              <Group justify="center">
                <Button loading={isUpdateCountLoading} variant="light" onClick={handleCountClick}>
                  {t('home.button.title', { count })}
                </Button>
              </Group>

              <Text>
                <Trans
                  t={t}
                  i18nKey="home.edit"
                  components={{
                    Code: <code />,
                  }}
                />
              </Text>
            </Stack>

            <Text c="dimmed">
              <Trans
                t={t}
                i18nKey="home.dimmed"
                components={{
                  Anchor: <Anchor target="_blank" />,
                }}
              />
            </Text>
          </Stack>

          <QueryPlayground />
        </Stack>
      </PageLoader>
    </>
  );
};

export default Home;
