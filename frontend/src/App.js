import React from 'react';
import {Switch, Route} from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Auth from './components/Auth/Auth';
import Verify from './components/Verify/Verify';
import './App.scss';


function App() {
    return (
        <>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Home}/>
                <Route path="/auth" exact component={Auth}/> 
                <Route path="/:token/verify" exact component={Verify}/>
            </Switch>   
        </>
    )
}

export default App;
