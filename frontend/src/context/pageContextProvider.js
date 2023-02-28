import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PageContext = createContext();

export const PageContextProvider = ({ children }) => {
    const [totalPage, setTotalPage] = useState(null);
    const [page, setPage] = useState(1);

    return (
        <PageContext.Provider value={{ totalPage, page, setPage }}>{children}</PageContext.Provider>
    );
};
