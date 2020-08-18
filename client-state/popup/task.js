const elSubscribeModal = document.getElementById('subscribe-modal');
const elSubscribeModalClose = elSubscribeModal.querySelector('.modal__close');

elSubscribeModalClose.addEventListener('click', () => {
    elSubscribeModal.classList.remove('modal_active');
    // *** Не записывается кука в хроме ***
    document.cookie = 'modalsubscribewasclosed=any';
    console.log(document.cookie);
});

function wasShowModal() {
    console.log(document.cookie);
    console.log((";" + document.cookie));
    console.log((";" + document.cookie).includes(';modalSubscribeWasClosed='));

    return (";" + document.cookie).includes(';modalSubscribeWasClosed=');
}

function showSubscribeModal() {
    if (!wasShowModal()) {
        elSubscribeModal.classList.add('modal_active');
    }
}

showSubscribeModal();

// *** Не записывается кука в хроме ***
console.log('1');
document.cookie = 'setnewcookie=data';
document.cookie = 'setnewcookie2=data2';
console.log('2');
console.log('kuka', document.cookie);
console.log('3');