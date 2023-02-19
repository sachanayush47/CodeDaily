import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryDropdown from "../components/CategoryDropdown";
import { notifyError } from "../utils/toastify";

import Fade from "react-reveal/Fade";

const parseHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
};

function Home() {
    const [posts, setPosts] = useState([]);

    const category = useLocation().search;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/posts${category}`);
                setPosts(res.data);
            } catch (error) {
                notifyError("Something went wrong");
            }
        };

        fetchPosts();
    }, [category]);

    return (
        <div className="home">
            <CategoryDropdown />
            <Fade bottom cascade>
                <div className="posts">
                    {posts.map((post) => (
                        <div className="post" key={post.id}>
                            <div className="img">
                                <img src={post.img} alt="" />
                            </div>
                            <div className="content">
                                <Link className="link" to={`/post/${post.id}`}>
                                    <h1>{post.title}</h1>
                                </Link>
                                <p>
                                    {parseHtml(post.desc)}
                                    <span>...</span>
                                </p>
                                <Link className="link" to={`/post/${post.id}`}>
                                    <button>read more</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>
            </Fade>
        </div>
    );
}

export default Home;
