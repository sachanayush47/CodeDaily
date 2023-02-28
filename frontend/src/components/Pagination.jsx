import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageContext } from "../context/pageContextProvider";

const Pagination = () => {
    const { page, totalPage, setPage } = useContext(PageContext);
    const navigate = useNavigate();

    const getPrevPage = () => {
        if (page != 1) {
            setPage((prevState) => prevState - 1);
            navigate(`/${page}`);
        }
    };

    const getNextPage = () => {
        if (page != totalPage) {
            setPage((prevState) => prevState + 1);
            navigate(`/${page}`);
        }
    };

    return (
        <div className="pagination-btn">
            <button onClick={() => getPrevPage()}>Prev</button>
            <p>
                {page} of {totalPage}
            </p>
            <button onClick={() => getNextPage()}></button>
        </div>
    );
};

export default Pagination;
