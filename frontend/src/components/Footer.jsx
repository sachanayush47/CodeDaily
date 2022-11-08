import React from "react";
import { Link } from "react-router-dom";

function Footer() {
    return (
        <footer>
            <div className="logo">
                <Link className="link" to="/">
                    CodeDaily
                </Link>
            </div>

            <span>Made with ❤️</span>
        </footer>
    );
}

export default Footer;
