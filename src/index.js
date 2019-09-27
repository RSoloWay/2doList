import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './App.css'
import App from './App';
// import Header from './Header'
import * as serviceWorker from './serviceWorker';



function clock() {

    ReactDOM.render(<App />, document.getElementById('root'));
}

setInterval(clock, 1000);


serviceWorker.unregister();
