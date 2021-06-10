import * as actionTypes from '../constants/token';

const tokenReducer = (state="", action) => {
    switch (action.type) {
        case actionTypes.ADD_TOKEN:
            localStorage.setItem("profile", JSON.stringify(action.payload));
            return action.payload;
        case actionTypes.DELETE_TOKEN:
            localStorage.removeItem("profile");
            return "";
        case actionTypes.UPDATE_TOKEN:
            localStorage.setItem("profile", JSON.stringify(action.payload));
            return action.payload;
        default:
            return state;
    }
}

export default tokenReducer;