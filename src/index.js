import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { CssBaseline } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from './store/store';
import App from './App';
import './index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </CssBaseline>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

// тохтуохха наада если все следующее число хуже чем то что мы имееет на данный момент через Math.max

// идея проста мы можем хранить результат подзадач так чтобы не пересчитывать их заново
