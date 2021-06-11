import React, { useEffect} from 'react';
import {useHistory} from 'react-router';
import Loading from '../Loading/Loading';
import './Verify.scss';
import { useDispatch, useSelector } from 'react-redux';
import { verify } from '../../redux/actions/form';

function Verify(props) {
    const history = useHistory();
    const dispatch = useDispatch();
    const {loading, error, success} = useSelector(state=>state.form); 
    const token = props.match.params.token;

    useEffect(()=>{
        dispatch(verify(token, history));
    }, [dispatch, history, token]);
    return (
        <div className="verify">
            <div className="verify__heading">
                {
                    success?
                    <>
                    <h1>Verification Complete....Redirecting you to home page.</h1>
                    <Loading/>
                    </>:
                    <h1>Verifying your account</h1>
                }
            </div>
            {
                loading?
                <p><Loading/></p>:
                error &&
                <p>{error}</p>
            }
        </div>
    )
}

export default Verify
