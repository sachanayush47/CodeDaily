import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import CategoryDropdown from "../components/CategoryDropdown";
import { notifyError } from "../utils/toastify";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import Fade from "react-reveal/Fade";
import Random from "../components/Random";
import Pagination from "../components/Pagination";

const parseHtml = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
};

function Home() {
    const [loading, setLoading] = useState(true);
    const [posts, setPosts] = useState([]);

    const location = useLocation().search;

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/posts${location}`);
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                notifyError("Something went wrong");
            }
        };

        fetchPosts();
    }, [location]);

    return (
        <div className="home">
            <CategoryDropdown />
            <Random />
            <Fade bottom cascade>
                <div className="posts">
                    {loading ? (
                        <>
                            <div className="post">
                                <div className="img">
                                    <Skeleton height={250} />
                                </div>
                                <div className="content">
                                    <Link className="link">
                                        <h1>
                                            <Skeleton height={50} />
                                        </h1>
                                    </Link>
                                    <p>{<Skeleton count={4} />}</p>
                                    <Link className="link">
                                        <Skeleton />
                                    </Link>
                                </div>
                            </div>
                            <div className="post">
                                <div className="img">
                                    <Skeleton height={250} />
                                </div>
                                <div className="content">
                                    <Link className="link">
                                        <h1>
                                            <Skeleton height={50} />
                                        </h1>
                                    </Link>
                                    <p>{<Skeleton count={4} />}</p>
                                    <Link className="link">
                                        <Skeleton />
                                    </Link>
                                </div>
                            </div>
                        </>
                    ) : (
                        posts.map((post) => (
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
                        ))
                    )}
                </div>
            </Fade>
            <Pagination />
        </div>
    );
}

export default Home;
