import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './presentationlayer/App';
import { ErrorBoundary } from 'react-error-boundary';
import Boundary from './presentationlayer/components/specific/error-boundary/ErrorBoundary';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <ErrorBoundary FallbackComponent={Boundary}>
    <App />
  </ErrorBoundary>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
