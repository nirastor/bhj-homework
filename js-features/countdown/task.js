const elTimer = document.getElementById('timer');
const elDownload = document.getElementById('link');
let timeInSec = elTimer.textContent;

function changeTimer() {
    timeInSec--;
    elTimer.textContent = timeInSec;
    if (timeInSec === 0) {
        clearInterval(timer);
        /*
        Q
        Почему алерт срабатывает раньше чем на таймере выставляется '0'
        
        A
        Смена textContent происходит не моментально, в отличие от алерта,
        который не только срабатывает быстрее, но и останавливает работу страницы на заднем фоне
        (потому и не происходит смена на 0 на фоне)
        Если обернуть алерт в setTimeout с задержкой в 0 мс то
        html будет успевать измениться до вывода алерта
        */
        setTimeout(() => alert('Вы победили в конкурсе!'), 0);
        download('hello.txt', 'This is the content of file');
        //location.assign("http://image.sendsay.ru/image/rosaski/zip/2974931595919496/images/90121595840821120.png");
        
    }
}

// Не совсем по описанию и не до конца понял как это работает, но работает
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// корректно использовать setTimeOut или setInterval для таких отсчетов,
// Он ведь не точно 1000ms выдает. На больших промежутках времени будет накапливаться ошибка
// A -- Некорректно!
const timer = setInterval(changeTimer, 1000);


/// *** Level-up-1 *** ///
const elTimerHMS = document.getElementById('timer--hhmmss');
const SEC_IN_MIN = 60;
const SEC_IN_HOUR = 3600;
let timeHMS = parseTime(elTimerHMS.textContent);

// Не смог придумать как не дублировать эту функцию.
// Разные элементы и разную переменную время можно передавать как аргументы
// Хотя со временем тоже вопрос: одну переменную нужно дополнительно обрабатывать, вторую — нет
// но как пердать в неё же id таймера
function changeTimerHMS() {
    timeHMS--;
    elTimerHMS.textContent = timeToStr(timeHMS);
    if (timeHMS === 0) {
        clearInterval(timerHMS);
        alert('Вы победили в конкурсе HMS!')
    }
}

const timerHMS = setInterval(changeTimerHMS, 1000);


function parseTime(str) {
    const time = str.split(':').map(i => Number(i));
    return time[0] * SEC_IN_HOUR + time[1] * SEC_IN_MIN + time[2];
}

function timeToStr(time) {
    function addZero(t) {
        if (t < 10) {
            t = '0' + t;
        } 
        return(t);
    }
    
    const rest_hh = time % SEC_IN_HOUR;
    const hh = (time - rest_hh) / SEC_IN_HOUR;
    const ss = rest_hh % SEC_IN_MIN;
    const mm = (rest_hh - ss) / SEC_IN_MIN;
    
    return `${addZero(hh)}:${addZero(mm)}:${addZero(ss)}`
}