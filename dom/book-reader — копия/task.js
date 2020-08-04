const elBookControlFontSize = document.querySelector('.book__control_font-size');
const elBookControlColor = document.querySelector('.book__control_color');
const elBookControlBgc = document.querySelector('.book__control_background');
const elBookContent = document.querySelector('.book__content');

elBookControlFontSize.addEventListener('click', (e) => {
    e.preventDefault();
    for (let children of elBookControlFontSize.children) {
        children.classList.remove('font-size_active');
    }
    e.target.classList.add('font-size_active');

    elBookContent.classList.remove('book_fs-small');
    elBookContent.classList.remove('book_fs-big');

    if (e.target.classList.contains('font-size_small')) {
        elBookContent.classList.add('book_fs-small');
    } else if (e.target.classList.contains('font-size_big')) {
        elBookContent.classList.add('book_fs-big');
    }
});

elBookControlColor.addEventListener('click', (e) => {
    if (!e.target.classList.contains('color')) {
        return;
    }
    
    e.preventDefault();
    for (let children of elBookControlColor.children) {
        children.classList.remove('color_active');
    }
    e.target.classList.add('color_active');

    elBookContent.classList.remove('book_color-gray');
    elBookContent.classList.remove('book_color-whitesmoke');

    if (e.target.classList.contains('color_gray')) {
        elBookContent.classList.add('book_color-gray');
    } else if (e.target.classList.contains('color_whitesmoke')) {
        elBookContent.classList.add('book_color-whitesmoke');
    }
});

elBookControlBgc.addEventListener('click', (e) => {
    if (!e.target.classList.contains('color')) {
        return;
    }
    
    e.preventDefault();
    for (let children of elBookControlBgc.children) {
        children.classList.remove('color_active');
    }
    e.target.classList.add('color_active');

    elBookContent.classList.remove('book_bg-gray');
    elBookContent.classList.remove('book_bg-black');

    if (e.target.classList.contains('color_gray')) {
        elBookContent.classList.add('book_bg-gray');
    } else if (e.target.classList.contains('color_black')) {
        elBookContent.classList.add('book_bg-black');
    }
});

/*
Готово, но расстраивает дублирование
Возможно стоит сделать объект со статусом области чтения
По нажатям именно кнопок обновлять объект и отрисовку кнопок,
а потом обновлять область чтения по объекту
*/