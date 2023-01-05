import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";
import { axiosInstance } from "../../config";

const Register = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(false);
        try {
            const res = await axiosInstance.post("auth/register", {
                username,
                email,
                password,
            });
            // console.log(res);
            // res.data && window.location.replace("/login");
            navigate("/login");
        } catch (error) {
            setError(true);
            // console.log(error);
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
            {error && <span className="wrong">something went wrong</span>}
        </div>
    );
};

export default Register;
