const elCookie = document.getElementById('cookie');
const elClickerCounter = document.getElementById('clicker__counter');
const elClickerSpeed = document.getElementById('clicker__speed');

const COOKIE_WIDTH_ORIGINAL = 200;
const COOKIE_WIDTH_BIGGER = 220;
const MS_IN_SEC = 1000;

let clickerCounter = 0;
let lastClickTime = null;

elCookie.onclick = function() {
    clickerCounter++;
    elClickerCounter.textContent = clickerCounter;
    
    if (elCookie.width === COOKIE_WIDTH_ORIGINAL) {
        elCookie.width = COOKIE_WIDTH_BIGGER;
    } else {
        elCookie.width = COOKIE_WIDTH_ORIGINAL;
    }

    if (lastClickTime) {
        const delayInMs = new Date() - lastClickTime;
        elClickerSpeed.textContent = (MS_IN_SEC / delayInMs).toFixed(2);
    }

    lastClickTime = new Date();
}