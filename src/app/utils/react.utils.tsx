import { createRoot } from 'react-dom/client';
import ReactApp from '../../ReactApp.tsx';

export function renderReactApp() {
  const elRoot = document.getElementById('root');
  console.warn('RENDERING REACT!');

  createRoot(elRoot!).render(
    // <StrictMode>
    <ReactApp/>
    // </StrictMode>
  );
}
