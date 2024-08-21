import { MantineProvider } from '@mantine/core';
import { Provider as StoreProvider } from 'react-redux';

import { Navigation } from '#/services/navigation';
import { store } from '#/services/store';
import theme from '#/services/theme';

// Connect internationalization files
import '#/services/internationalization/internationalization';

/*
  Mantine

  All packages except `@mantine/hooks` require styles imports
  About layers: https://mantine.dev/styles/mantine-styles/#css-layers
*/
import '@mantine/core/styles.layer.css';

// Includes global project styles
import '#/assets/styles/global.scss';

const environments = import.meta.env;

console.info('MODE: ', environments.MODE);
console.info('API: ', environments.VITE_API_URL);

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <MantineProvider theme={theme} defaultColorScheme="auto">
        <Navigation />
      </MantineProvider>
    </StoreProvider>
  );
};

export default App;
