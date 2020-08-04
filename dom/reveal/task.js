const elReveals = document.querySelectorAll('.reveal');

function isVisible(el) {
   if (el.getBoundingClientRect().top < window.innerHeight &&
       el.getBoundingClientRect().bottom > 0) {
            return true;
    }
    return false;
}

document.addEventListener('scroll', () => {
    for(blockReveal of elReveals) {
        if (isVisible(blockReveal)) {
            blockReveal.classList.add('reveal_active');
        } else {
            blockReveal.classList.remove('reveal_active');
        }
    }
});

/*
    Немного поправил CSS, чтобы было заметнее, что класс появляется только
    после того как блок появилсяв видимой области страницы
*/