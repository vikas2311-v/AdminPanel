import React, { useState } from 'react';
import login from './Login.module.css';
import { useNavigate } from 'react-router-dom';


const pattern = /\s/g;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
const passwordPattern = /^(?=.*[a-z])(?=.*\d)(?=.*[A-Z])(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function Login() {
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();

    function white() {
        const user = document.getElementById("email").value;

        if (user.match(pattern)) {
            setEmailError("* White Spaces are not allowed in Email");
            return false;
        }

        if (!user.match(emailPattern)) {
            setEmailError("* Invalid Email Format");
            return false;
        }

        setEmailError("");
        return true;
    }

    function black() {
        const pass = document.getElementById("password").value;

        if (pass.match(pattern)) {
            setPasswordError("* White Spaces are not allowed in Password");
            return false;
        }

        if (!pass.match(passwordPattern)) {
            setPasswordError("* Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character");
            return false;
        }

        setPasswordError("");
        return true;
    }

    function validateForm(event) {
        event.preventDefault();
        if (!white() || !black()) {
            setPasswordError("* Please fill all details");
            return false;
        }
        navigate('/Dash');
        return true;
    }

    return (
        <div className="container">
            <h2>Login</h2>
            <form id="loginForm" onSubmit={(e) => validateForm(e)}>
                <input type="text" placeholder="Email"  className={login.email} id="email" onKeyUp={white} required />
                <error id="emailError" style={{ color: 'red' }}>{emailError}</error>
                <br /><br />
                <input type="password" placeholder="Password" className={login.password} id="password" onKeyUp={black} required />
                <br /><br />
                <error id="passwordError" style={{ color: 'red' }}>{passwordError}</error>
                <br />
                <input type="submit" id="login" className={login.login} value="Login" onClick={(e) => validateForm(e)} />
            </form>
        </div>
    );
}

export default Login;
