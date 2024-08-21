import { useState } from 'react';

import viteLogo from '/vite.svg';
import ReactLogo from '#/assets/react.svg?react';

import classes from './Home.module.scss';

const Home: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className={classes.logo} alt="Vite" />
        </a>

        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <ReactLogo className={`${classes.logo} ${classes.react}`} />
        </a>
      </div>

      <h1>Vite + React</h1>

      <div className={classes.card}>
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>

        <p>
          Edit <code>src/pages/Home.tsx</code> and save to test HMR
        </p>
      </div>

      <p className={classes.read_the_docs}>
        Click on the{' '}
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          Vite
        </a>{' '}
        and{' '}
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          React
        </a>{' '}
        logos to learn more
      </p>
    </>
  );
};

export default Home;
