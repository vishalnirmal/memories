import React from 'react';
import useLoadImage from './loadImage';

function Image({url, alt, loader, fallback, className}) {
    const {loading, imageData} = useLoadImage(url);
    return (
        <img className={className} src={loading?loader:imageData?imageData:fallback} alt={alt}/>
    )
}

export default Image
