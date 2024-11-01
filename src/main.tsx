import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login';
import Register from './Register';
import './css/style.css';
import './css/satoshi.css';
import 'sweetalert2/src/sweetalert2.scss';
import 'flatpickr/dist/flatpickr.min.css';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/admin/*" element={<App />} />
        <Route path="/pasajeros/*" element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
