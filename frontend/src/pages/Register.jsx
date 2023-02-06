import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { notifyError, notifySuccess } from "../utils/toastify";

function Register() {
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
