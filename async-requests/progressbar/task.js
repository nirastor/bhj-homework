const elProgress = document.getElementById('progress');
const elForm = document.getElementById('form');

console.log(elProgress.value);

elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    elProgress.value = 0.2;
    console.log(elProgress.value, 'submit');
    const formData = new FormData(elForm);
    const xhrSendForm = new XMLHttpRequest();
    xhrSendForm.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    xhrSendForm.addEventListener('readystatechange', () => {
        elProgress.value += 0.2;
        console.log('progress', elProgress.value);
        console.log('readyState', xhrSendForm.readyState);
    });
    xhrSendForm.send(formData);
    elForm.reset();
});