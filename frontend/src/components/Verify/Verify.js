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
            <h1 className="verify__heading">Verifying your account</h1>
            {
                loading?
                <p><Loading/></p>:
                error?
                <p>{error}</p>:
                success && 
                <>
                    <p>Verification Complete....Redirecting you to home page.</p>
                    <Loading size={"2rem"}/>
                </>
            }
        </div>
    )
}

export default Verify
