import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import * as actionTypes from '../../redux/constants/token';
import memories from '../../images/memories.png';
import './NavBar.scss';
import propic from '../../images/dummy.png';

function NavBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const {user, token} = useSelector(state=>state.token);
    const logout = () => {
        dispatch({
            type: actionTypes.DELETE_TOKEN
        });
    }
    const navigateToHome = () => {
        if (history.location.pathname !== "/"){
            history.push("/");
        }
        else{
            history.replace("/");
        }
    }
    return (
        <div className="navbar">
            <div className="navbar__logo" onClick={navigateToHome}>
                <p className="navbar__logo__heading">Memories</p>
                <img className="navbar__logo__image" src={memories} alt="memories"/>
            </div>
            {
                token?
                (
                    <div className="navbar__userDetails">
                        <img className="navbar__userDetails__picture" src={user.profilePicture || propic} alt={user.name}/>
                        <p className="navbar__userDetails__name">{user.name}</p>
                        <button className="navbar__userDetails__logout" onClick={logout}>Logout</button>
                    </div>
                ):
                (
                    <Link className="navbar__login" to="/auth">Log In</Link>
                )
            }
        </div>
    )
}

export default NavBar
