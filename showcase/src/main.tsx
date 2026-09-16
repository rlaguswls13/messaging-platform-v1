import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { WhitelabelProvider } from './context/WhitelabelContext';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <WhitelabelProvider>
      <App />
    </WhitelabelProvider>
  </React.StrictMode>
);
