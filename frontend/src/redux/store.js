import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';
import {composeWithDevTools} from 'redux-devtools-extension';

const middleware = [thunk];

const INITIAL_STATE = {
    posts: {
        posts: []
    }
}

const store = createStore(reducers, INITIAL_STATE, composeWithDevTools(applyMiddleware(...middleware)));

export default store;