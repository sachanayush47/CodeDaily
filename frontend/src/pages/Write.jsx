import { useState } from "react";
import axios from "axios";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate, useLocation } from "react-router-dom";
import moment from "moment";
import { notifyError, notifySuccess } from "../utils/toastify";

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
    "\n 3. Posts are automatically categorized as 'other' by default" +
    "\n 4. Keep all content respectful and professional" +
    "\n 5. No spamming or self-promotion without adding value to the discussion" +
    "\n 6. Refrain from posting illegal or offensive material" +
    "\n 7. Respect the intellectual property rights of others";
function Write() {
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

    const navigate = useNavigate();

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

            navigate(`/post/${res.data.insertId}`);
            notifySuccess(res.data.message);
        } catch (error) {
            notifyError(error.response.data);
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
                        value={value}
                        onChange={setValue}
                        modules={modules}
                        format={formats}
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
                            value="languages"
                            id="languages"
                            checked={category === "languages"}
                            onChange={(e) => setCategory(e.target.value)}
                        />
                        <label htmlFor="dsa">Languages</label>
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
                        <label htmlFor="webdev">Framework & Libaries</label>
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
                        <label htmlFor="languages">DSA</label>
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
                        <label htmlFor="tricks">Jobs & Internships</label>
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
                        <label htmlFor="tricks">Tech News</label>
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
