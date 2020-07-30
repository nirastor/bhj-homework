const elModalMain = document.getElementById('modal_main');
const elModalMainClose = elModalMain.getElementsByClassName('modal__close_times').item(0);
const elModalMainMakeGood = elModalMain.getElementsByClassName('btn').item(0);

const elModalSuccess = document.getElementById('modal_success');
const elModalSuccessAnyEl = elModalSuccess.querySelectorAll('*');

elModalMain.classList.add('modal_active');

elModalMainClose.onclick = function() {
    elModalMain.classList.remove('modal_active');
}

elModalMainMakeGood.onclick = function() {
    elModalMain.classList.remove('modal_active');
    elModalSuccess.classList.add('modal_active');
}

for (let e of elModalSuccessAnyEl) {
    e.onclick = function() {
        elModalSuccess.classList.remove('modal_active');
    }
}