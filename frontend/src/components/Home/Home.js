import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import Filter from '../Filter/Filter';
import {getPosts} from '../../redux/actions/post';
import './Home.scss';
import axios from 'axios';

function Home() {
    const dispatch = useDispatch();
    const {token, filter} = useSelector(state => state);
    useEffect(()=>{
        let source = axios.CancelToken.source();
        dispatch(getPosts(filter, source));
        return ()=>{
            source.cancel();
        }
    }, [filter, dispatch]);
    return (
        <div className="container">
                <Posts/>
                <div className="container__forms">
                    <Filter/>
                    {
                        token?
                        <Form/>:
                        ""
                    }
                </div>
        </div>
    );
}

export default Home;
