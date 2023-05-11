import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import {AccessTokenProvider} from './context/auth';
import { ThemeChangerProvider } from './context/themeSelect';
import { ModalContentProvider } from './context/modalContent';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AccessTokenProvider>
<ModalContentProvider>
      <ThemeChangerProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </ThemeChangerProvider>
</ModalContentProvider>
    </AccessTokenProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
