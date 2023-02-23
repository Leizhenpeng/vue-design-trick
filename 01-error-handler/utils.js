function AddTime(fn) {
    const start = Date.now();
    callWithErr(fn)
    console.log(` Execute Total Time : ${Date.now() - start} ms`);
}
function AddSlogan(fn) {
    console.log("welcome to base vue");
    callWithErr(fn)
}

// Error Handler
let errorHandler = (err) => {
    console.log("Error Catch: ", err);
}
function RegisterError(fn) {
    errorHandler = fn;
}
function callWithErr(fn) {
    try {
        fn && fn();
    } catch (err) {
        errorHandler(err)
    }
}


export default {
    AddTime,
    AddSlogan,
    RegisterError
}

