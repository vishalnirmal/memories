import React from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import './Home.scss';
import { useSelector } from 'react-redux';

function Home() {
    const {token} = useSelector(state => state.token);
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
