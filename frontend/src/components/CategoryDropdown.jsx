import React from "react";
import { Link } from "react-router-dom";

function CategoryDropdown() {
    return (
        <label className="dropdown">
            <div className="dd-button">Categories</div>

            <input type="checkbox" className="dd-input" id="test" />

            <ul
                className="dd-menu"
                onClick={() => (document.getElementById("test").checked = false)}
            >
                <Link className="link" to="/?cat=languages&page=1">
                    <li>
                        <h6>Languages</h6>
                    </li>
                </Link>
                <Link className="link" to="/?cat=lib&page=1">
                    <li>
                        <h6>Framework & Libaries</h6>
                    </li>
                </Link>
                <Link className="link" to="/?cat=dsa&page=1">
                    <li>
                        <h6>DSA</h6>
                    </li>
                </Link>
                <Link className="link" to="/?cat=sql&page=1">
                    <li>
                        <h6>SQL</h6>
                    </li>
                </Link>
                <Link className="link" to="/?cat=jobs&page=1">
                    <li>
                        <h6>Jobs & Internships</h6>
                    </li>
                </Link>
                <Link className="link" to="/?cat=news&page=1">
                    <li>
                        <h6>Tech News</h6>
                    </li>
                </Link>
                <Link className="link" to="/?cat=others&page=1">
                    <li>
                        <h6>Others</h6>
                    </li>
                </Link>
                {/* <li className="divider"></li> */}
                {/* <li>
                    <a href="http://google.com">Link to</a>
                </li> */}
            </ul>
        </label>
    );
}

export default CategoryDropdown;
