import React, { useState, useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router';
import Base64 from 'react-file-base64';
import Input from './Input/Input';
import Loading from '../Loading/Loading';
import {register, login} from '../../redux/actions/form';
import dummy from '../../images/dummy.png';
import './Auth.scss';

function Auth() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isRegister, setIsRegister] = useState(false);
    const {loading, error, success} = useSelector(state=>state.form);
    const token = useSelector(state=>state.token);
    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        profilePicture: ""
    });
    const [validationError, setValidationError] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: ""
    });
    const [isPasswordHidden, setIsPasswordHidden] = useState(true);

    useEffect(() => {
        if (token)
            history.push("/");
        console.log(token);
    }, [token, history]);
    
    const toggleForm = () => {
        setIsRegister(!isRegister);
        resetForm();
    }

    const resetForm = () => {
        setUser({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
        setValidationError({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: ""
        });
    }

    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
        if (isRegister && e.target.name === "password" && !(/.*[A-Z].*/.test(e.target.value) && /.*[a-z].*/.test(e.target.value) && /.*\d.*/.test(e.target.value) && /.*\W.*/.test(e.target.value)))
        {
            setValidationError({
                ...validationError,
                password: "Password should be alphanumeric and should also contain special character"
            });
        }
        else{
            setValidationError({
                ...validationError,
                password: ""
            });
        }
    }
    const saveFile = ({base64}) => {
        setUser({
            ...user,
            profilePicture: base64
        });
    }
    const handleValidation = () => {
        let validationState = {
            ...validationError
        };
        let flag = false;
        if (isRegister && user.confirmPassword !== user.password){
            validationState.confirmPassword = "Password does not match";
            flag = true;
        }
        if (isRegister && user.firstName.trim() === ""){
            validationState.firstName = "First name required";
            flag = true;
        }
        if (isRegister && user.lastName.trim() === ""){
            validationState.lastName = "Last name required";
            flag = true;
        }
        if (user.email.trim() === ""){
            validationState.email = "Email required";
            flag = true;
        }
        if (flag){
            setValidationError(validationState);
            return;
        }
        // Submit the form
        if (isRegister){
            dispatch(register(user));
        }
        else{
            dispatch(login(user, history));
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        handleValidation();
        resetForm();
    }

    return (
        <div className="auth">
            {
                success?
                <h1 className="auth__success">Registration complete.... Check email inbox to get the verification link. You can close this tab now.</h1>
            :
            (<>
                <h1 className="auth__heading">{isRegister?"Register":"Log In"}</h1>
                <form className="auth__form" onSubmit={handleSubmit}>
                    {
                        error?
                        <p className="auth__form__errorMessage">{error}</p>:
                        ""
                    }
                    {
                        isRegister && <img src={user.profilePicture || dummy} alt="profile" className="auth__form__profile" />
                    }
                    {
                        isRegister && 
                        <div className="auth__form__name">
                            <Input 
                            value={user.firstName}
                            handleChange={handleChange}
                            name={"firstName"}
                            placeholder={"First Name"}
                            error={validationError.firstName}
                            />
                            <Input
                            value={user.lastName}
                            handleChange={handleChange}
                            name={"lastName"}
                            placeholder={"Last Name"}
                            error={validationError.lastName}
                            />
                        </div>
                    }
                    <Input
                    type={"email"}
                    value={user.email}
                    handleChange={handleChange}
                    name={"email"}
                    placeholder={"Email"}
                    error={validationError.email}
                    />
                    <Input
                    type={isPasswordHidden?"password":"text"}
                    value={user.password}
                    handleChange={handleChange}
                    name={"password"}
                    placeholder={"Password"}
                    extraProp={
                        <i className={"far "+(isPasswordHidden?"fa-eye":"fa-eye-slash")} 
                        onClick={()=>setIsPasswordHidden(!isPasswordHidden)}></i>
                    }   
                    error={validationError.password}
                    />
                    {
                        isRegister &&
                        <Input
                        type={"password"}
                        value={user.confirmPassword}
                        handleChange={handleChange}
                        name={"confirmPassword"}
                        placeholder={"Confirm Password"}
                        error={validationError.confirmPassword}
                        />
                    }
                    {
                        isRegister &&
                        <Base64 type="file" multiple={false} onDone={saveFile} />
                    }
                    <button className="auth__form__button" type="submit" disabled={loading}>{loading?(<Loading/>):isRegister?"Register":"Log In"}</button>
                </form>
                <p className="auth__redirectLink" onClick={toggleForm}>
                    {
                        isRegister?
                        "Have an account already? Log In":
                        "Don't have an account? Register"
                    }
                </p>
                </>)
            }
        </div>
    )
}

export default Auth;
