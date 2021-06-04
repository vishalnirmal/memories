import React from 'react';
import memories from '../../images/memories.png';
import './NavBar.scss';

function NavBar() {
    return (
        <div className="navbar">
            <p className="navbar__heading">Memories</p>
            <img className="navbar__image" src={memories} alt="memories"/>
        </div>
    )
}

export default NavBar
