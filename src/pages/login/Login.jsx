import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { LoginFailure, LoginStart, LoginSuccess } from "../../context/Actions";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethods";
import { Puff } from "react-loader-spinner";

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const { user, isFetching, dispatch } = useContext(Context);
    const [error, setError] = useState("");
    console.log(error);
    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(LoginStart());
        try {
            const res = await publicRequest.post("/auth/login", {
                username: userRef.current.value,
                password: passwordRef.current.value,
            });
            console.log(res);
            dispatch(LoginSuccess(res.data));
            // dispatch( {type:"LOGIN_SUCCESS",payload:res.data});
        } catch (error) {
            setError(error.response.data.message);
            console.log(error.response.data.message);
            dispatch(LoginFailure());
        }
    };

    return (
        <div className="login">
            {isFetching && (
                <div className="loader__login">
                    <Puff
                        height="50px"
                        width="50px"
                        radius={1}
                        color="#4d83a9"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                    />
                </div>
            )}
            <form className="login__form" onSubmit={handleSubmit}>
                <h1 className="login__formTitle">Login </h1>
                <div className="error-message">
                    <span className="error-text">{error}</span>
                </div>
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
