import { createRoot } from '@wordpress/element';

import App from './App.jsx';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('phonebook-app');
  if (root) {
    createRoot(root).render(<App />);
  }
});
