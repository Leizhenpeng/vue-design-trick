import t from "./utils.js";

const testFunc1 = () => {
    let r = 0;
    r = 2022 + 1;
    return r;
}

const testFunc2 = () => {
    let r = 0; 
    r = 2022 + 2;
    throw new Error("test error");
    return 
}

t.RegisterError((err) => {
    console.log("Error Catch: ", err);
})
t.AddTime(testFunc1)
t.AddSlogan(testFunc2)