import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const parseHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
};

function Home() {
    // Message dialog: Error
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

    const [posts, setPosts] = useState([]);

    const category = useLocation().search;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/posts${category}`);
                setPosts(res.data);
            } catch (error) {
                notifyError(
                    "Something went wrong. Unable to fetch posts, please try again."
                );
            }
        };

        fetchPosts();
    }, [category]);

    return (
        <div className="home">
            <ToastContainer />
            <div className="posts">
                {posts.map((post) => (
                    <div className="post" key={post.id}>
                        <div className="img">
                            <img src={`./uploads/${post.img}`} alt="" />
                        </div>
                        <div className="content">
                            <Link className="link" to={`/post/${post.id}`}>
                                <h1>{post.title}</h1>
                            </Link>
                            <p>{parseHtml(post.desc)}</p>
                            <Link className="link" to={`/post/${post.id}`}>
                                <button>read more...</button>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
