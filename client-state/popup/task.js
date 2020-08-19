const elSubscribeModal = document.getElementById('subscribe-modal');
const elSubscribeModalClose = elSubscribeModal.querySelector('.modal__close');

elSubscribeModalClose.addEventListener('click', () => {
    elSubscribeModal.classList.remove('modal_active');
    document.cookie = 'modalwasshown=true; Expires=Mon, 31 Aug 2020 21:41:37 GMT';
});

function wasShowModal() {
    return ("; " + document.cookie).includes('; modalwasshown=');
}

function showSubscribeModal() {
    if (!wasShowModal()) {
        elSubscribeModal.classList.add('modal_active');
    }
}

document.cookie = 'somefirstcoocie=first; Expires=Mon, 31 Aug 2020 21:41:37 GMT';
showSubscribeModal();