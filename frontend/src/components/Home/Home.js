import React, { useEffect } from 'react';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import './Home.scss';
import { useSelector } from 'react-redux';

function Home(props) {
    const token = useSelector(state => state.token);
    // useEffect(()=>{
    //     if (!token)
    //         props.history.push("/login");
    // }, [token, props.history]);
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
