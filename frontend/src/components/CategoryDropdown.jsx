import React from "react";
import { Link } from "react-router-dom";

function CategoryDropdown() {
    return (
        <label className="dropdown">
            <div className="dd-button">Categories</div>

            <input type="checkbox" className="dd-input" id="test" />

            <ul
                className="dd-menu"
                onClick={() =>
                    (document.getElementById("test").checked = false)
                }
            >
                <li>
                    <Link className="link" to="/?cat=languages">
                        <h6>Languages</h6>
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/?cat=lib">
                        <h6>Framework & Libaries</h6>
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/?cat=dsa">
                        <h6>DSA</h6>
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/?cat=sql">
                        <h6>SQL</h6>
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/?cat=jobs">
                        <h6>Jobs & Internships</h6>
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/?cat=news">
                        <h6>Tech News</h6>
                    </Link>
                </li>
                <li>
                    <Link className="link" to="/?cat=others">
                        <h6>Others</h6>
                    </Link>
                </li>
                {/* <li className="divider"></li> */}
                {/* <li>
                    <a href="http://google.com">Link to</a>
                </li> */}
            </ul>
        </label>
    );
}

export default CategoryDropdown;
