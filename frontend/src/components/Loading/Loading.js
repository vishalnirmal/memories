import React from 'react';
import './Loading.scss';

function Loading({size}) {
    return (
        <i className="fas fa-circle-notch animate" style={
            {
                fontSize: size
            }
        }></i>
    )
}

export default Loading
