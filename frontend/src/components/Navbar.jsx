import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Navbar() {
    const onLogout = async () => {
        const res = await axios.post("/auth/logout");
        console.log(res);
    };

    return (
        <div className="navbar">
            <div className="container">
                <div className="logo">
                    <Link className="link" to="/">
                        CodeDaily
                    </Link>
                </div>
                <div className="links">
                    <Link className="link" to="/?cat=dsa">
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
                    </Link>

                    <span>Ayush</span>
                    <span onClick={onLogout}>Logout</span>
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
