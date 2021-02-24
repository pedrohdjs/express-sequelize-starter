module.exports = () => {
    const err = new Error("The requested API route doesn't exist.");
    err.status = 404;
    return err;
}