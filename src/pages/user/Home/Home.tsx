import { useState } from 'react';

import { Anchor, Button, Group, Image, Stack, Text, Title } from '@mantine/core';
import { clsx } from 'clsx';
import { Trans, useTranslation } from 'react-i18next';

import viteLogo from '/vite.svg';
import ReactLogo from '#/assets/react.svg?react';

import classes from './Home.module.scss';

const Home: React.FC = () => {
  const { t } = useTranslation();

  const [count, setCount] = useState(0);

  const handleCountClick = () => setCount((count) => count + 1);

  return (
    <Stack align="center" className={classes.root}>
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
          <Button variant="light" onClick={handleCountClick}>
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
  );
};

export default Home;
