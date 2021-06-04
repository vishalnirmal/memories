import React from 'react';
import Posts from './components/Posts/Posts';
import Form from './components/Form/Form';
import NavBar from './components/NavBar/NavBar';
import './App.scss';


function App() {
    return (
        <>
            <NavBar/>
            <div className="container">
                <Posts className="container__posts"/>
                <Form className="container__form"/>
            </div>
        </>
    )
}

export default App;
