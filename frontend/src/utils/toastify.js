import { toast } from "react-toastify";

export const notifyError = (message) =>
    toast.error(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

export const notifySuccess = (message) =>
    toast.success(message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });

export const updateToast = (id, message, type) => {
    toast.update(id, {
        position: "top-right",
        render: message,
        type: type,
        isLoading: false,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "dark",
    });
};
