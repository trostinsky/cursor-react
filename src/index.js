import registerServiceWorker from './registerServiceWorker';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

ReactDOM.render(<App text="Ostap" />, document.getElementById('root'));
registerServiceWorker();
