import React, { useEffect, useState, useContext } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import DOMPurify from "dompurify";
import Fade from "react-reveal/Fade";
import { toast } from "react-toastify";

import Edit from "../img/edit.png";
import Delete from "../img/delete.png";

import Menu from "../components/Menu";
import { AuthContext } from "../context/authContextProvider";
import { notifyError, updateToast } from "../utils/toastify";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function Single() {
    useEffect(() => {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    });

    const { currentUser } = useContext(AuthContext);

    const [loading, setLoading] = useState(true);
    const [post, setPost] = useState({});

    const { id: postId } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`/posts/${postId}`);
                setPost(res.data);
                setLoading(false);
            } catch (error) {
                notifyError(error.response.data.message);
            }
        };

        fetchPost();
    }, [postId]);

    const navigate = useNavigate();

    const handleDelete = async () => {
        const id = toast.loading("Working...");

        try {
            const res = await axios.delete(`/posts/${postId}`);
            updateToast(id, res.data.message, "success");
            navigate("/");
        } catch (error) {
            updateToast(id, error.response.data.message, "error");
        }
    };

    return (
        <div className="single">
            <div className="content">
                <Fade left>
                    {loading ? <Skeleton height={350} /> : <img src={post.img} alt="" />}
                </Fade>
                {!loading && (
                    <Fade left>
                        <div className="user">
                            {post.userImg && <img src={post.userImg} alt="" />}
                            <div className="info">
                                <span>
                                    <Link className="link" to={`/user/${post.uid}`}>
                                        {post.username}
                                    </Link>
                                </span>
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
                    </Fade>
                )}

                <Fade bottom>
                    <h1>{loading ? <Skeleton height={50} width="75%" /> : post.title}</h1>
                </Fade>
                {loading ? (
                    <>
                        <Skeleton count={2} />
                        <Skeleton count={4} />
                        <Skeleton count={5} />
                    </>
                ) : (
                    <p
                        dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(post.desc),
                        }}
                    ></p>
                )}
            </div>
            <br />
            <p className="end">...</p>
            <h2>Other posts you may like</h2>
            {post.category && <Menu category={post.category} />}
        </div>
    );
}

export default Single;
