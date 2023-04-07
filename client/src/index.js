import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SocketProvider } from './context/SocketContext';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Start from './pages/Start.js';
import Room from './pages/Room.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SocketProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start />} />
          <Route path ='/room/:id' element={<Room />} />
        </Routes>
      </BrowserRouter>
    </SocketProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
