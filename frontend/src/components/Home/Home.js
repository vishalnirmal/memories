import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import {getPosts} from '../../redux/actions/post';
import './Home.scss';

function Home() {
    const dispatch = useDispatch();
    const {token} = useSelector(state => state.token);
    useEffect(()=>{
        dispatch(getPosts());
    });
    return (
        <div className="container">
                <Posts/>
                {
                    token?
                    <Form/>:
                    ""
                }
        </div>
    );
}

export default Home;
