import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];

const token = JSON.parse(localStorage.getItem("profile"));
const INITIAL_STATE = {
    posts: {
        posts: [],
        loading: true
    },
    token: token || "",
    filter: {
        value: ""
    }
};

const store = createStore(reducers, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));

export default store;