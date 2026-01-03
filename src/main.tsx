/**
 * Flux Dashboard
 *
 * Open Source Admin Dashboard Template
 * Author: Brayan Salgado
 * License: MIT
 *
 * This header may be removed by the user in production,
 * but the LICENSE file must be preserved.
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './styles/index.css';
import './i18n';
import App from './app/App';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
