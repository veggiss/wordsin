import React, { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './css/index.css';

const rootElement = document.getElementById('app-root');
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>,
);
