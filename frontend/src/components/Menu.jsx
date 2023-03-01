import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Menu = ({ category }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/posts?cat=${category}`);
                setPosts(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, [category]);

    return (
        <div className="menu">
            {loading && (
                <>
                    <div className="post">
                        <Skeleton height={200} />
                        <h3>
                            <Skeleton height={25} />
                        </h3>
                        <Link>
                            <Skeleton height={20} width="25%" />
                        </Link>
                    </div>
                    <div className="post">
                        <Skeleton height={200} />
                        <h3>
                            <Skeleton height={25} />
                        </h3>
                        <Link>
                            <Skeleton height={20} width="25%" />
                        </Link>
                    </div>
                </>
            )}
            {!loading &&
                posts.map((post) => (
                    <div className="post" key={post.id}>
                        <img src={post.img} alt="" />
                        <h3>{post.title}</h3>
                        <Link to={`/post/${post.id}`}>
                            <button>read more...</button>
                        </Link>
                    </div>
                ))}
        </div>
    );
};

export default Menu;
