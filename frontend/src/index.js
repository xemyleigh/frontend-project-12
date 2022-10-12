import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router
} from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/js/dist/collapse'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* <Router> */}
      <Router>
        <App />

      </Router>
    {/* </Router> */}
  </React.StrictMode>,
);

