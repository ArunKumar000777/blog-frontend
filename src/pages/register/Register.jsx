import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { axiosInstance } from "../../config";
import { ToastContainer, toast } from "react-toastify";

const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const notify = (errorMsg) => {
        toast.error(`${errorMsg}`, {
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
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axiosInstance.post("auth/register", {
                username,
                email,
                password,
            });
            navigate("/login");
        } catch (error) {
            notify(error?.response?.data?.message);
        }
    };

    return (
        <div className="register">
            <form className="register__form" onSubmit={handleSubmit}>
                <h1 className="register__formTitle">Register</h1>
                <label>Username</label>
                <input
                    type="text"
                    required
                    placeholder="Enter your username..."
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label>Email</label>
                <input type="email" required placeholder="Enter your email..." onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label>
                <input type="password" required placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                <button className="register__button">Register</button>
            </form>
            <button className="loginButton">
                <Link className="link" to="/login">
                    Login
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

export default Register;
