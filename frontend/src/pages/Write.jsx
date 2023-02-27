import { useRef, useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import { notifySuccess, updateToast } from "../utils/toastify";
import { toast } from "react-toastify";

const modules = {
    toolbar: [
        [{ header: [1, 2, 3, 4] }],
        [{ size: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "image"],
        ["code-block"],
    ],
};

const formats = [
    "header",
    "size",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "link",
    "image",
    "code-block",
];

const textBoxPlaceholder =
    "Start writing here.." +
    "\n 1. Description should have at least 200 characters" +
    "\n 2. Title should have at least 10 characters" +
    "\n 3. All the fields are mandatory including image" +
    "\n 4. Accepted image formats are limited to JPEG and JPG, with a maximum file size of 1MB." +
    "\n 5. No spamming or self-promotion without adding value to the discussion" +
    "\n 6. Refrain from posting illegal or offensive material" +
    "\n 7. Respect the intellectual property rights of others";

function Write() {
    const state = useLocation().state;

    const [desc, setDesc] = useState(state?.desc || localStorage.getItem("desc") || "");
    const [title, setTitle] = useState(state?.title || localStorage.getItem("title") || "");
    const [image, setImage] = useState(state?.img || null);
    const [category, setCategory] = useState(
        state?.category || localStorage.getItem("category") || ""
    );

    const fileInputRef = useRef();

    const navigate = useNavigate();

    const saveAsDraft = () => {
        localStorage.setItem("title", title);
        localStorage.setItem("desc", desc);
        localStorage.setItem("category", category);
        notifySuccess("The draft has been saved.");
    };

    const handleClick = async (e) => {
        e.preventDefault();
        document.getElementById("submit").disabled = true;
        document.getElementById("submit").style.backgroundColor = "#777";
        document.getElementById("submit").style.borderColor = "#777";

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("desc", desc);
        formData.append("category", category);

        const id = toast.loading("Working...");

        try {
            let res;
            if (state) {
                res = await axios.put(`/posts/${state.id}`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            } else {
                res = await axios.post(`/posts/`, formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
            }

            navigate(`/post/${res.data.insertId}`);
            updateToast(id, res.data.message, "success");
        } catch (error) {
            updateToast(id, error.response.data.message, "error");
            document.getElementById("submit").disabled = false;
            document.getElementById("submit").style.backgroundColor = "teal";
            document.getElementById("submit").style.borderColor = "teal";
        }
    };

    return (
        <div className="add">
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
                        value={desc}
                        onChange={setDesc}
                        modules={modules}
                        format={formats}
                        placeholder={textBoxPlaceholder}
                    />
                </div>
            </div>
            <div className="menu">
                <div className="item">
                    <h1>Publish</h1>
                    <span>Status: DRAFT</span>
                    <span>Visibility: PUBLIC</span>
                    <input
                        ref={fileInputRef}
                        style={{ display: "none" }}
                        type="file"
                        id="file"
                        name="file"
                        accept="image/jpg, image/jpeg"
                        onChange={(e) => setImage(e.target.files[0])}
                    />

                    <div className="buttons">
                        <button onClick={() => fileInputRef.current.click()}>Upload image</button>
                        <button onClick={saveAsDraft}>Save as draft</button>
                        <button id="submit" onClick={handleClick}>
                            Publish
                        </button>
                    </div>
                    {image && <span className="image-name">{image?.name}</span>}
                </div>
                <div className="item">
                    <h1>Category</h1>

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
                            value="lib"
                            id="lib"
                            checked={category === "lib"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="lib">Framework & Libaries</label>
                    </div>
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
                            value="jobs"
                            id="jobs"
                            checked={category === "jobs"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="jobs">Jobs & Internships</label>
                    </div>
                    <div className="cat">
                        <input
                            type="radio"
                            name="cat"
                            value="news"
                            id="news"
                            checked={category === "news"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="news">Tech News</label>
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
