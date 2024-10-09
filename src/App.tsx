import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { Provider as StoreProvider } from 'react-redux';

import { Navigation } from '#/services/navigation';
import { PermissionsProvider } from '#/services/permissions';
import { setupStore } from '#/services/store';
import { theme, cssVariablesResolver } from '#/services/theme';

// Connect internationalization files
import '#/services/internationalization/internationalization';

// Connect styles of packages

/*
  Mantine

  All packages except `@mantine/hooks` require styles imports
  About layers: https://mantine.dev/styles/mantine-styles/#css-layers
*/
import '@mantine/core/styles.layer.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.layer.css';

// Includes global project styles
import '#/assets/styles/global.scss';

const environments = import.meta.env;

const store = setupStore();

console.info('MODE: ', environments.MODE);
console.info('API: ', environments.VITE_API_URL);

const App: React.FC = () => {
  return (
    <StoreProvider store={store}>
      <PermissionsProvider>
        <MantineProvider
          theme={theme}
          defaultColorScheme="auto"
          cssVariablesResolver={cssVariablesResolver}
        >
          <Notifications position="top-right" />
          <Navigation />
        </MantineProvider>
      </PermissionsProvider>
    </StoreProvider>
  );
};

export default App;
