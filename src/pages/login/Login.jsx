import React, { useContext, useRef, useState } from "react";
import "./login.css";
import { Link } from "react-router-dom";
import { LoginFailure, LoginStart, LoginSuccess } from "../../context/Actions";
import { Context } from "../../context/Context";
import { publicRequest } from "../../requestMethods";
import { Puff } from "react-loader-spinner";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
    const userRef = useRef();
    const passwordRef = useRef();
    const {isFetching, dispatch } = useContext(Context);
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
            // setError(error?.response?.data?.message);
            // console.log(error.response.data.message);
            // console.log(error.response.status);
            if (error.response.status === 404 || 400) {
                notify();
                setError("wrong credentials");
            }
            dispatch(LoginFailure());
        }
    };
    const notify = () => {
        toast.error('Wrong Credentials', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
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
                <label>Username</label>
                <input type="text" placeholder="Enter your username..." ref={userRef} className="login__inputs"  required/>
                <label>Password</label>
                <input type="password" placeholder="Password" ref={passwordRef} className="login__inputs"  required/>
                <button type="submit" className="login__button" disabled={isFetching}>
                    Login
                </button>
            </form>
            <button className="registerButton">
                <Link className="link" to="/register">
                    Register
                </Link>
            </button>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Login;
