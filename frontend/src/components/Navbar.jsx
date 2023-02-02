import React from "react";
import axios from "axios";
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
                    {/* <Link className="link" to="/?cat=dsa">
                        <h6>DSA</h6>
                    </Link>
                    <Link className="link" to="/?cat=webdev">
                        <h6>WebDev</h6>
                    </Link>
                    <Link className="link" to="/?cat=languages">
                        <h6>Languages</h6>
                    </Link>
                    <Link className="link" to="/?cat=sql">
                        <h6>SQL</h6>
                    </Link>
                    <Link className="link" to="/?cat=tricks">
                        <h6>Tricks</h6>
                    </Link>
                    <Link className="link" to="/?cat=others">
                        <h6>Others</h6>
                    </Link> */}

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
                    <span className="write">
                        <Link className="link" to="/write">
                            Write
                        </Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Navbar;
