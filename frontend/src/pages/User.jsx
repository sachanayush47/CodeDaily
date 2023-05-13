import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContextProvider";
import { notifyError } from "../utils/toastify";
import moment from "moment";

const User = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);

    const { currentUser, logout } = useContext(AuthContext);
    const { id: userId } = useParams();

    useEffect(() => {
        const fetch = async () => {
            try {
                const userData = await axios.get(`/user/${userId}`);
                setUser(userData.data);
                const userPost = await axios.get(`/user/post/${userId}`);
                setPosts(userPost.data);
                console.log(userPost.data);
            } catch (error) {
                notifyError("Something went wrong");
            }
        };

        fetch();
    }, []);

    return (
        <div className="user">
            <div className="user-info">
                <h1>User Details</h1>
                <p>ID: {user.id}</p>
                <p>Username: {user.username}</p>
                <p>Email: {user.email}</p>
                <p>Total contribution: {posts.length} blogs</p>
                <p>Verified: True</p>
                {currentUser?.id == userId && <button onClick={logout}>Logout</button>}
                {currentUser?.id == userId && (
                    <Link to="/user/changepassword">
                        <button>Change Password</button>
                    </Link>
                )}
            </div>

            <div className="table">
                <table>
                    <thead>
                        <th>Post ID</th>
                        <th>Title</th>
                        <th>Date</th>
                        <th>Category</th>
                    </thead>
                    {posts.map((post) => {
                        return (
                            <tr key={post.id}>
                                <td>{post.id}</td>

                                <td>
                                    {
                                        <Link to={`/post/${post.id}`} className="link">
                                            {post.title}
                                        </Link>
                                    }
                                </td>
                                <td>{moment(post.date).format("DD-MM-YYYY")}</td>
                                <td>{post.category}</td>
                            </tr>
                        );
                    })}
                </table>
            </div>
        </div>
    );
};

export default User;
