import React, { useEffect, useState } from "react";
import Edit from "../img/edit.png";
import Delete from "../img/delete.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Menu from "../components/Menu";
import axios from "axios";
import moment from "moment";
import { useContext } from "react";
import { AuthContext } from "../context/authContextProvider";
import DOMPurify from "dompurify";
import { notifyError, notifySuccess } from "../utils/toastify";

function Single() {
    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    const { currentUser } = useContext(AuthContext);

    const [post, setPost] = useState({});

    const location = useLocation();
    const postId = location.pathname.split("/")[2];

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
            } catch (error) {
                notifyError("Something went wrong");
            }
        };

        fetchPost();
    }, [postId]);

    const navigate = useNavigate();

    const handleDelete = async () => {
        const temp = post.img.split("/");
        const imgId = temp[temp.length - 1].split(".")[0];
        try {
            await axios.delete(`/upload/${imgId}`);
            await axios.delete(`/posts/${postId}`);
            notifySuccess("Post deleted successfully");
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
                <img src={post.img} alt="" />
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
            <br />
            <p className="end">...</p>
            <h2>Other posts you may like</h2>
            {post.category && <Menu category={post.category} />}
        </div>
    );
}

export default Single;
