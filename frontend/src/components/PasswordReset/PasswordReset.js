import React, { useState } from 'react';
import Input from '../Auth/Input/Input';
import Loading from '../Loading/Loading';
import {sendPasswordResetEmail} from '../../api/users';
import './PasswordReset.scss';

function PasswordReset() {
    const [email, setEmail] = useState("");
    const [{error, loading, success}, setMessage] = useState({
        error: "",
        loading: false,
        success: false
    });
    const handleChange = (e) => {
        setEmail(e.target.value);
    }
    const handleSubmit = async (e) => {
        // Submit the email
        e.preventDefault();
        setMessage(prev=>({
            ...prev,
            loading: true
        }));
        try {
            await sendPasswordResetEmail(email);
            setMessage({
                loading: false,
                error: "",
                success: true
            });
        } catch (error) {
            setMessage({
                loading: false,
                error: error.response.data.message,
                success: false
            });
        }
    }
    const isEmptyOrLoading = () => {
        return email.trim() === "" || loading;
    }
    return (
        <div className="reset">
            <h1 className="reset__heading">Trouble Logging In?</h1>
            {
                success && <p className="reset__message reset__message--success">Email has been sent successfully</p>
            }
            {
                error && <p className="reset__message reset__message--error">{error}</p>
            }
            <form className="reset__form" onSubmit={handleSubmit}>
                <Input value={email} handleChange={handleChange} name="email" placeholder="Enter you email"/>
                <button onClick={handleSubmit} className="reset__form__button" disabled={isEmptyOrLoading()}>
                    {
                        loading?
                        <Loading/>:
                        "Send Link"
                    }
                </button>
            </form>
            <a href="/auth" className="reset__redirectLink">Back To Log In</a>
        </div>
    )
}

export default PasswordReset
