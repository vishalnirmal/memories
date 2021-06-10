import React from 'react';
import reactDOM from 'react-dom';
import {BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './App';
import store from './redux/store';


reactDOM.render( 
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider> , document.getElementById("root"));