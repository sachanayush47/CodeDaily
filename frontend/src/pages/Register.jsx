import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
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
        email: "",
        password: "",
    });

    const navigate = useNavigate();

    const onChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("/auth/register", inputs);
            notifySuccess("User has been created.");
            navigate("/login");
        } catch (error) {
            notifyError(error.response.data);
        }
    };

    return (
        <div className="auth">
            <ToastContainer />
            <h1>Register</h1>
            <form>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={onChange}
                />
                <input
                    required
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={onChange}
                />
                <input
                    required
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={onChange}
                />
                <button onClick={onSubmit}>Register</button>
                <span>
                    do you have an account? <Link to="/login">Login</Link>
                </span>
            </form>
        </div>
    );
}

export default Register;
