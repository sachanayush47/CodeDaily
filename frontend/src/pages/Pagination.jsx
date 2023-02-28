import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import axios from "axios";

const Pagination = () => {
    const location = useLocation().search;
    const query = queryString.parse(location);

    const [totalPage, setTotalPage] = useState(null);

    useEffect(() => {
        const fetchTotalPage = async () => {
            const res = await axios.get(`/posts/totalpage${location}`);
            setTotalPage(res.data);
        };

        fetchTotalPage();
    });

    let currPage = query.page ? parseInt(query.page) : 1;

    const navigate = useNavigate();
    const getPrevPage = () => {
        if (currPage > 1) {
            if (query.cat) navigate(`/?cat=${query.cat}&page=${currPage - 1}`);
            else navigate(`/?page=${currPage - 1}`);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    };

    const getNextPage = () => {
        if (currPage < totalPage) {
            if (query.cat) navigate(`/?cat=${query.cat}&page=${currPage + 1}`);
            else navigate(`/?page=${currPage + 1}`);
            document.body.scrollTop = document.documentElement.scrollTop = 0;
        }
    };
    return (
        <div className="pagination">
            <button onClick={getPrevPage}>Prev</button>
            <span>
                {query.page ? query.page : 1} of {totalPage}
            </span>
            <button onClick={getNextPage}>Next</button>
        </div>
    );
};

export default Pagination;
