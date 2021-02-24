module.exports = (exception) => {
    const err = new Error("A database error has occurred.");
    err.exception = exception;
    err.status = 500;
    return err;
}