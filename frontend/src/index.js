import ReactDOM from 'react-dom/client';
import React from 'react';
import init from './init';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    {init()}
  </React.StrictMode>,
);
