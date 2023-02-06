import axios from "axios";
import { useEffect, useState } from "react";

const Menu = ({ category }) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/posts?cat=${category}`);
                setPosts(res.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchPosts();
    }, [category]);

    return (
        <div className="menu">
            {posts.map((post) => (
                <div className="post" key={post.id}>
                    <img src={post.img} alt="" />
                    <h3>{post.title}</h3>
                    <button>read more...</button>
                </div>
            ))}
        </div>
    );
};

export default Menu;
