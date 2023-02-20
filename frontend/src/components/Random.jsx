import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { notifyError } from "../utils/toastify";
function Random() {
    const navigate = useNavigate();

    const fetchId = async () => {
        try {
            const res = await axios.get("/posts/random");
            console.log(res.data.postId);
            navigate(`/post/${res.data.postId}`);
        } catch (error) {
            notifyError(error.response.data.message || "Something went wrong.");
        }
    };

    return (
        <Link onClick={fetchId} id="random">
            <span>Random</span>
        </Link>
    );
}

export default Random;
