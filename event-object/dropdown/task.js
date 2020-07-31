const elLangSelect = document.querySelector('.dropdown__value');
const elLangSelectList = document.querySelector('.dropdown__list');

elLangSelect.addEventListener('click', () => {
    elLangSelectList.classList.toggle('dropdown__list_active');
});

elLangSelectList.addEventListener('click', (e) => {
    e.preventDefault();
    elLangSelectList.classList.remove('dropdown__list_active');
    elLangSelect.textContent = e.target.textContent;
});