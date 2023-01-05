import React, { useContext, useRef } from "react";
import { Link } from "react-router-dom";
import { LoginFailure, LoginStart, LoginSuccess } from "../../context/Actions";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethods";
import "./login.css";

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const { user, isFetching, dispatch } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(LoginStart());
        try {
            const res = await publicRequest.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            dispatch(LoginSuccess(res.data));
            // dispatch( {type:"LOGIN_SUCCESS",payload:res.data});
        } catch (error) {
            dispatch(LoginFailure());
        }
    };


    return (
        <div className="login">
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__formTitle">Login</h1>
                <label>Username</label>
                <input type="text" placeholder="Enter your username..." ref={userRef} />
                <label>Password</label>
                <input type="password" placeholder="Password" ref={passwordRef} />
                <button type="submit" className="login__button" disabled={isFetching}>
                    Login
                </button>
            </form>
            <button className="registerButton">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
        </div>
    );
};

export default Login;
