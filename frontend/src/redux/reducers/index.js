import postsReducer from './posts';
import bufferReducer from './buffer';
import {combineReducers} from 'redux';


export default combineReducers({
    posts: postsReducer,
    buffer: bufferReducer
});