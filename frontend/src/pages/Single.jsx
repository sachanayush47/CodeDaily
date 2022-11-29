import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContextProvider";
import DOMPurify from "dompurify";

function Single() {
    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

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

    const { currentUser } = useContext(AuthContext);

    const [post, setPost] = useState({});

    const location = useLocation();
    const postId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (error) {
                notifyError(
                    "Something went wrong. Unable to fetch posts, please try again."
                );
            }
        };

        fetchPosts();
    }, [postId]);

    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            const res = await axios.delete(`/posts/${postId}`);
            navigate("/");
        } catch (error) {
            notifyError(
                "Something went wrong. Unable to fetch posts, please try again."
            );
        }
    };

    return (
        <div className="single">
            <div className="content">
                <img src={`../uploads/${post.img}`} alt="" />
                <div className="user">
                    {post.userImg && <img src={post.userImg} alt="" />}
                    <div className="info">
                        <span>{post.username}</span>
                        <p>Posted {moment(post.date).fromNow()}</p>
                    </div>

                    {currentUser?.username === post.username && (
                        <div className="edit">
                            <Link to={`/write?edit=${postId}`} state={post}>
                                <img src={Edit} alt="" />
                            </Link>
                            <img onClick={handleDelete} src={Delete} alt="" />
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <p
                    dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(post.desc),
                    }}
                ></p>
            </div>
            {post.category && <Menu category={post.category} />}
        </div>
    );
}

export default Single;
