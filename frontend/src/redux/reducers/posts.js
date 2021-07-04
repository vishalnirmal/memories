import * as actionTypes from '../constants/posts';

const postsReducer = (state = { posts: [] }, action) => {
    switch (action.type) {
        case actionTypes.FETCH_POSTS_REQUEST:
            return {
                loading: true,
                error: "",
                posts: []
            }
        case actionTypes.FETCH_POSTS_ERROR:
            return {
                loading: false,
                error: action.payload,
                posts: []
            }
        case actionTypes.FETCH_POSTS_SUCCESS:
            return {
                loading: false,
                error: "",
                posts: action.payload
            }
        case actionTypes.ADD_POST:
            return {
                ...state,
                posts: [action.payload, ...state.posts]
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
            const {postId, userId} = action.payload;
            return {
                ...state,
                posts: state.posts.map(post=>{
                    if (post._id === postId){
                        const index = post.likes.indexOf(userId);
                        if (index === -1){
                            post.likes.push(userId);
                        }
                        else{
                            post.likes.splice(index, 1);
                        }
                    }
                    return post;
                })
            }
        default:
            return state;
    }
}

export default postsReducer;