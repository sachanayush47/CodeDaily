import React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/authContextProvider";

function Navbar() {
    const { currentUser, logout } = useContext(AuthContext);

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">
                        CodeDaily
                    </Link>
                </div>
                <div className="links">
                    <span>
                        {currentUser ? (
                            currentUser.username
                        ) : (
                            <Link className="link" to="/login">
                                Login
                            </Link>
                        )}
                    </span>

                    {currentUser ? (
                        <span onClick={logout}>Logout</span>
                    ) : (
                        <span>
                            <Link className="link" to="/register">
                                Register
                            </Link>
                        </span>
                    )}
                    <Link className="link" to="/write">
                        <span className="write">Write</span>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
