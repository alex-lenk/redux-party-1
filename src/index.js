import React from 'react';
import ReactDOM from 'react-dom/client';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = () => {
    function fn() {
        return 'Title'
    }
    return <h1>{fn()}</h1>
}

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);
