// Define an array of event listeners
const listeners = Array.from({length: 400000}, (e, i) => ({
    e: 'click',
    f: ev => console.log(`${i+1}th binding - ${ev.target.innerHTML} ms`)
}));

const btnTest = document.querySelector('#btnTest');
const button1 = document.querySelector('#btn1');
const button2 = document.querySelector('#btn2');

const getPrevious = (arr, i) => arr[i-1];
const getNext = (arr, i) => arr[i];

const plainBindEvent = (button = button1) => {
    for(let i = 1, len = listeners.length; i < len; i++) {
        const now = getNext(listeners, i);
        const prev = getPrevious(listeners, i);
        button.addEventListener(
            now.e,
            now.f
        );
        button.removeEventListener(
            prev.e,
            prev.f
        );
    }
};

// keyword: vue event invoker / patchEvent
const vei = {};

const cacheBindEvent = (button = button2) => {
    for(let i = 1, len = listeners.length; i < len; i++) {
        const now = getNext(listeners, i);
        let invoker = vei[now.e];

        if(invoker) {
            invoker.value = now.f;
            continue;
        }

        if(!invoker) {
            invoker = e => invoker.value(e);
            invoker.value = now.f;
            button.addEventListener(now.e, invoker);
            vei[now.e] = invoker;
        }
    }
};

// Test case
const wrapTimer = (fn, btn) => (event, ...args) => {
    const t = Date.now();
    fn(...args);
    btn.innerHTML = `total used ${Date.now() - t} ms`;
}

const fn1 = wrapTimer(plainBindEvent, button1);
const fn2 = wrapTimer(cacheBindEvent, button2);
btnTest.addEventListener('click', () => {
    button1.addEventListener('click', fn1());
    button2.addEventListener('click', fn2());
});