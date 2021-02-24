module.exports = () => {
    const err = new Error("There is no user with the passed id.");
    err.status = 404;
    return err;
}