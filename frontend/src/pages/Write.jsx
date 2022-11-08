import React, { useState } from "react";

import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

function Write() {
    const [value, setValue] = useState("");

    return (
        <div className="add">
            <div className="content">
                <input type="text" placeholder="Title" />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        placeholder="Start writing here..."
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>Status: draft</span>
                    <span>Visibility: public</span>
                    <input style={{ display: "none" }} type="file" id="file" />

                    <div className="buttons">
                        <button>
                            <label htmlFor="file">Upload image</label>
                        </button>
                        <button>Save as draft</button>
                        <button>Update</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>

                    <div className="cat">
                        <input type="radio" name="cat" value="dsa" id="dsa" />
                        <label htmlFor="dsa">DSA</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="webdev"
                            id="webdev"
                        />
                        <label htmlFor="webdev">WebDev</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="languages"
                            id="languages"
                        />
                        <label htmlFor="languages">Languages</label>
                    </div>
                    <div className="cat">
                        <input type="radio" name="cat" value="sql" id="sql" />
                        <label htmlFor="sql">SQL</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="tricks"
                            id="tricks"
                        />
                        <label htmlFor="tricks">Tricks</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="others"
                            id="others"
                        />
                        <label htmlFor="others">Others</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;
