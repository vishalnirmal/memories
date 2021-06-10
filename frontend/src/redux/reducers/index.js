import postsReducer from './posts';
import bufferReducer from './buffer';
import formReducer from './form';
import tokenReducer from './token';
import {combineReducers} from 'redux';


export default combineReducers({
    posts: postsReducer,
    buffer: bufferReducer,
    form: formReducer,
    token: tokenReducer
});