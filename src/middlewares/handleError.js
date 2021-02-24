/*This function must be defined as the LAST middleware used in app.js.
Everytime next(err) is called, from anywhere in the application, will trigger this function.
For best pratices, use Error objects, provided by the Node.js standard library 
(no require/import needed).*/
module.exports = (err,req,res,next) => {
    if(err.redirect){
        return res.redirect(err.redirect);
    }
    res.status(err.status || 500);
    res.json({
        err: {
            message: err.message,
            exception: err.exception
        }
    }) 
}