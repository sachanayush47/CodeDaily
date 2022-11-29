import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useContext } from "react";
import { AuthContext } from "../context/authContextProvider";

function Login() {
    // Message dialog: Success
    const notifySuccess = (message) =>
        toast.success(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    // Message dialog: Error
    const notifyError = (message) =>
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    });

    const { login } = useContext(AuthContext);

    const navigate = useNavigate();

    const onChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await login(inputs);
            notifySuccess("Logged in successfully.");
            navigate("/");
        } catch (error) {
            notifyError(error.response.data);
        }
    };

    return (
        <div className="auth">
            <ToastContainer />
            <h1>Login</h1>
            <form>
                <input
                    required
                    name="username"
                    type="text"
                    placeholder="Username"
                    onChange={onChange}
                />
                <input
                    required
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={onChange}
                />
                <button onClick={onSubmit}>Login</button>
                <span>
                    don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    );
}

export default Login;
