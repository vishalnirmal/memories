import React from 'react';
import './Input.scss';

function Input({value, handleChange, name, placeholder, error, type, extraProp}) {
    return (
        <div className={"inputField "+(error && "inputField--error")}>
            <input 
            type={type || "text"}
            value={value} 
            onChange={handleChange} 
            name={name} 
            id={name} 
            htmlFor={name} 
            placeholder={placeholder} 
            autoComplete="off"/>
            <p>{error}</p>
            <div className="inputField__extra">
                {extraProp}
            </div>
        </div>
    )
}

export default Input
