import React, { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { Navigate, redirect, useLocation } from "react-router-dom";
import moment from "moment";
import { toast, ToastContainer } from "react-toastify";

const textBoxPlaceholder =
    "Start writing here.." +
    "\n 1. Description should have at least 200 characters" +
    "\n 2. Title should have at least 10 characters" +
    "\n 3. Posts are automatically categorized as 'other' by default";

function Write() {
    const notifyError = (message) =>
        toast.error(message, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
        });

    const state = useLocation().state;

    const [value, setValue] = useState(state?.desc || "");
    const [title, setTitle] = useState(state?.title || "");
    const [image, setImage] = useState(null);
    const [category, setCategory] = useState(state?.category || "");

    const upload = async () => {
        try {
            const formData = new FormData();
            formData.append("image", image);
            const res = await axios.post("/upload", formData);
            return res.data;
        } catch (error) {
            console.log(error);
        }
    };

    const handleClick = async (e) => {
        e.preventDefault();

        const imgUrl = image && (await upload());

        try {
            const res = state
                ? await axios.put(`/posts/${state.id}`, {
                      title: title,
                      desc: value,
                      category: category,
                      img: imgUrl || state?.img,
                  })
                : await axios.post(`/posts/`, {
                      title: title,
                      desc: value,
                      category: category,
                      img: imgUrl ? imgUrl : "",
                      date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                  });
        } catch (error) {
            notifyError(error.response.data);
        }
    };

    return (
        <div className="add">
            <ToastContainer />
            <div className="content">
                <input
                    value={title}
                    type="text"
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <div className="editorContainer">
                    <ReactQuill
                        className="editor"
                        theme="snow"
                        value={value}
                        onChange={setValue}
                        placeholder={textBoxPlaceholder}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>Status: draft</span>
                    <span>Visibility: public</span>
                    <input
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name="file"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <div className="buttons">
                        <button>
                            <label htmlFor="file">Upload image</label>
                        </button>
                        <button>Save as draft</button>
                        <button onClick={handleClick}>Publish</button>
                    </div>
                </div>
                <div className="item">
                    <h1>Category</h1>

                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="dsa"
                            id="dsa"
                            checked={category === "dsa"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="dsa">DSA</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="webdev"
                            id="webdev"
                            checked={category === "webdev"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="webdev">WebDev</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="languages"
                            id="languages"
                            checked={category === "languages"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="languages">Languages</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="sql"
                            id="sql"
                            checked={category === "sql"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="sql">SQL</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="tricks"
                            id="tricks"
                            checked={category === "tricks"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="tricks">Tricks</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="others"
                            id="others"
                            checked={category === "others"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="others">Others</label>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Write;
