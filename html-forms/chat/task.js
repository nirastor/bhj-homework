const elChatOpen = document.querySelector('.chat-widget__side');
const elChat = document.querySelector('.chat-widget');
const elChatTextArea = document.getElementById('chat-widget__input');
const elChatMessagesArea = document.getElementById('chat-widget__messages');

const MESSAGE_TIMEOUT_TIME = 30000;
let answerInterval;

const robotAnswers = [
    'Добрый день, мы ещё не проснулись. Позвоните через 10 лет',
    'Вы еще ничего не купили, чтобы так разговирать!',
    'Кто тут?',
    'Где ваша совесть!?',
    'К сожалению все операторы заняты. Вам никто не ответит.'
];

elChatOpen.addEventListener('click', () => {
    elChat.classList.add('chat-widget_active');
    answerInterval = setTimeout(showMessage, MESSAGE_TIMEOUT_TIME, false);
});

elChatTextArea.addEventListener('keydown', (e) => {
    if (e.code === 'Enter' && elChatTextArea.value) {
        showMessage(true, elChatTextArea.value);
        elChatTextArea.value = '';
        showMessage(false);
        clearInterval(answerInterval);
        answerInterval = setTimeout(showMessage, MESSAGE_TIMEOUT_TIME, false);
    } 
});

function getMessageTime() {
    function addZero(t) {
        if (t < 10) {
            t = '0' + t;
        }
        return t;
    }
    
    const date = new Date();
    let hh = addZero(date.getHours());
    let mm = addZero(date.getMinutes());
    return hh + ':' + mm;
}

function showMessage(isClient, text) {
    let clientClass = '';
    if (isClient) {
        clientClass = ' message_client';
    } else {
        const randAnswerIndex = Math.floor(Math.random() * robotAnswers.length);
        text = robotAnswers[randAnswerIndex];
    }
    
    elChatMessagesArea.innerHTML += `<div class="message${clientClass}">
        <div class="message__time">${getMessageTime()}</div>
        <div class="message__text">${text}</div>
    </div>`;
    
    elChatMessagesArea.lastChild.scrollIntoView();
}