import { Home } from '#/pages';

// Includes global project styles
import '#/assets/styles/global.scss';

const environments = import.meta.env;

console.info('MODE: ', environments.MODE);
console.info('API: ', environments.VITE_API_URL);

const App: React.FC = () => {
  return <Home />;
};

export default App;
