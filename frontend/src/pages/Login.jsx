import React from "react";
import { Link } from "react-router-dom";

function Login() {
    return (
        <div className="auth">
            <h1>Login</h1>
            <form>
                <input required type="text" placeholder="Username" />
                <input required type="password" placeholder="Password" />
                <button>Login</button>
                <p>There is an error.</p>
                <span>
                    Don't have an account? <Link to="/register">Register</Link>
                </span>
            </form>
        </div>
    );
}

export default Login;
