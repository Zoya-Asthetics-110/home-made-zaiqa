
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const mount = () => {
  const container = document.getElementById('root');
  if (container) {
    console.log("Root element found, mounting app...");
    const root = createRoot(container);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } else {
    console.error("Root element not found, retrying...");
    setTimeout(mount, 50);
  }
};

// Start the mounting process
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount);
} else {
  mount();
}
