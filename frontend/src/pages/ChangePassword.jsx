import React, { useState } from "react";
import axios from "axios";
import { notifyError, notifySuccess } from "../utils/toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const [inputs, setInputs] = useState({
        password: "",
        password1: "",
        password2: "",
    });

    const navigate = useNavigate();

    const onChange = (e) => {
        setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const changePassword = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post("/user/changePassword", inputs);
            notifySuccess(res.data.message);
            navigate(-1);
        } catch (error) {
            notifyError(error.response.data.message);
        }
    };

    return (
        <div className="auth">
            <h1>Change Password</h1>
            <form>
                <input
                    type="password"
                    name="password"
                    placeholder="Current Password"
                    onChange={onChange}
                />
                <input
                    required
                    type="password"
                    name="password1"
                    placeholder="New Password"
                    onChange={onChange}
                />
                <input
                    required
                    type="password"
                    name="password2"
                    placeholder="Confirm New Password"
                    onChange={onChange}
                />
                <button onClick={changePassword}>Change password</button>
            </form>
        </div>
    );
};

export default ChangePassword;
