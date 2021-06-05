import * as actionTypes from '../constants/posts';

const postsReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload]
            };
        case actionTypes.DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post._id !== action.payload)
            };
        case actionTypes.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(post=>{
                    if (post._id === action.payload._id){
                        return action.payload;
                    }
                    return post;
                })
            }
        case actionTypes.LIKE_POST:
            return {
                ...state,
                posts: state.posts.map(post=>{
                    if (post._id === action.payload){
                        post.likes += 1;
                    }
                    return post;
                })
            }
        default:
            return state;
    }
}

export default postsReducer;