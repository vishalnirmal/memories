import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'

function useLoadImage(url) {
    const [loading, setLoading] = useState(true);
    const [imageData, setImageData] = useState("");
    const fetchImage = useCallback(async ()=>{
        const data = await axios.get(url);
        setImageData(data);
        setLoading(false);
    }, [url]);
    useEffect(()=>{
        fetchImage();
    }, [fetchImage]); 
    return {
        loading,
        imageData
    };
}

export default useLoadImage;
