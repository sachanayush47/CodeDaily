const errorHandler = (err, req, res, next) => {
    console.log("ERROR HANDLER");
    console.log(err);
    const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message,
    });
};

export default errorHandler;
