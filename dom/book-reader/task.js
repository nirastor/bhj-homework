const elControlFontsize = Array.from(document.querySelectorAll('.font-size'));
const elControlColors = Array.from(document.querySelectorAll('.color'));
const bookContent = document.querySelector('.book__content');
const initialBookClass = bookContent.className;

const bookContentStatus = {
    fontSize: null,
    color: null,
    backgroundColor: null,
};

function updateControls(elem, activeClassName) {
    for (child of elem.parentElement.children){
        child.classList.remove(activeClassName);
    }
    elem.classList.add(activeClassName)
}

function updateBookContent() {
    bookContent.className = initialBookClass;
    for (let prop in bookContentStatus) {
        if (bookContentStatus[prop]) {
            bookContent.classList.add(bookContentStatus[prop]);
        }
    }
}

function setBookContent(elem) {
    // Вот тут по красоте просится готовый объект, чтобы не плодить переменные, но ладно, и так сойдет ©
    let classPrefix;
    let property;
    let dataName;
    
    // Вот тут по красоте просится готовый объект, чтобы не плодить переменные, но ладно, и так сойдет ©
    if (elem.closest('.book__control_color')) {
        classPrefix = 'book_color-';
        property = 'color';
        dataName = 'color';
    } else if (elem.closest('.book__control_background')) {
        classPrefix = 'book_bg-';
        property = 'backgroundColor'
        dataName = 'color';
    } else if (elem.closest('.book__control_font-size')) {
        classPrefix = 'book_fs-';
        property = 'fontSize'
        dataName = 'size';
    }

    if (elem.dataset[dataName]) {
        bookContentStatus[property] = `${classPrefix}${elem.dataset[dataName]}`;
    } else {
        bookContentStatus[property] = null;
    }

}

function bookControlClick(evt, activeClassName) {
    evt.preventDefault();
    updateControls(evt.target, activeClassName);
    setBookContent(evt.target);
    updateBookContent();
}

for (el of elControlColors) {
    el.addEventListener('click', (e) => {bookControlClick(e, 'color_active')});
}

for (el of elControlFontsize) {
    el.addEventListener('click', (e) => {bookControlClick(e, 'font-size_active')});
}








// *** Old Copy-Paste Version ***

/*
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

*/