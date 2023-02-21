import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContextProvider";
import { notifyError, notifySuccess } from "../utils/toastify";

function Login() {
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
            const res = await login(inputs);
            notifySuccess("Login successful");
            navigate("/");
        } catch (error) {
            console.log(error);
            notifyError(error.response.data.message);
        }
    };

    return (
        <div className="auth">
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
