import React, { useState } from 'react';
import Loading from '../Loading/Loading';
import Input from '../Auth/Input/Input';
import './PasswordResetConfirm.scss';
import {resetPassord} from '../../api/users';

function PasswordResetConfirm(props) {
    const [{password, confirmPassword}, setPassword] = useState({
        confirmPassword: "",
        password: ""
    });
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);
    const [validationError, setValidationError] = useState({
        password: "",
        confirmPassord: ""
    });
    const [{loading, error, success}, setData] = useState({
        loading: false,
        error: "",
        success: false
    });
    const handleChange = (e) => {
        const {name, value} = e.target;
        setPassword(prev => ({
            ...prev,
            [name]: value
        }));
        if (name === "password"){
            validatePassword(value);
        }
    }
    const validatePassword = (password) => {
        // Checking password criterias
        if (/.*[a-z].*/.test(password) && 
            /.*\d.*/.test(password) && 
            /.*\W.*/.test(password)){
                setValidationError(prev=>({
                    ...prev,
                    password: ""
                }));
                return;
        }
        setValidationError(prev=>({
            ...prev,
            password: "Password should be alphanumeric and should also contain special character"
        }));
    }
    const isEmptyOrLoading = () => {
        return password.trim() === "" || confirmPassword.trim() === "" || validationError.password !== "" || loading;
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword){
            setValidationError(prev=>({
                ...prev,
                confirmPassword: "Password do not match"
            }));
            return;
        }
        setData({
            loading: true,
            error: "",
            success: false
        });
        try {
            const token = props.match.params.token;
            await resetPassord(token, {
                password,
                confirmPassword
            });
            setData({
                loading: false,
                error: "",
                success: true
            });
            setTimeout(()=>{
                props.history.replace("/auth");
            }, 3000);
        } catch (error) {
            setData({
                loading: false,
                error: error.response.data.message,
                success: false
            });
        }
    }
    return (
        <div className="reset">
            <p className="reset__heading">Reset Password</p>
            {
                success && <p className="reset__message reset__message--success">Password reset successfull Redirecting to login page <br/><br/> <Loading size="1.5rem" /></p>
            }
            {
                error && <p className="reset__message reset__message--error">{error}</p>
            }
            <form className="reset__form" onSubmit={handleSubmit}>
                <Input
                    type={isPasswordHidden?"password":"text"}
                    value={password}
                    handleChange={handleChange}
                    name={"password"}
                    placeholder={"Password"}
                    error={validationError.password}
                    extraProp={
                        <i className={"far "+(isPasswordHidden?"fa-eye":"fa-eye-slash")} 
                        onClick={()=>setIsPasswordHidden(prev=>!prev)}></i>
                    } 
                />
                <Input
                    type={"password"}
                    value={confirmPassword}
                    handleChange={handleChange}
                    name={"confirmPassword"}
                    placeholder={"Confirm Password"}
                    error={validationError.confirmPassword}
                />
                <button className="reset__form__button" disabled={isEmptyOrLoading()}>{loading?(<Loading/>):"Reset"}</button>
            </form>
        </div>
    )
}

export default PasswordResetConfirm
