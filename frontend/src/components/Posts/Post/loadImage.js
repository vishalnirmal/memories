import axios from 'axios';
import { useCallback, useEffect, useState } from 'react'
import {getImage} from '../../../api/posts';

function useLoadImage(url) {
    const [loading, setLoading] = useState(true);
    const [imageData, setImageData] = useState("");
    const fetchImage = useCallback(async (source)=>{
        const data = await getImage(url, source);
        setImageData(data);
        setLoading(false);
    }, [url]);
    useEffect(()=>{
        let source = axios.CancelToken.source();
        fetchImage(source);
        return ()=>{
            setImageData("");
            setLoading(false);
            source.cancel();
        }
    }, [fetchImage]); 
    return {
        loading,
        imageData
    };
}

export default useLoadImage;
