const elProgress = document.getElementById('progress');
const elForm = document.getElementById('form');

console.log(elProgress.value);

elForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // elProgress.value = 0.2;
    // console.log(elProgress.value, 'submit');
    const formData = new FormData(elForm);
    const xhrSendForm = new XMLHttpRequest();
    xhrSendForm.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');
    
    xhrSendForm.upload.addEventListener('progress', (e) => {
        elProgress.value += e.loaded / e.total;
        console.log(elProgress.value);
    });

    xhrSendForm.addEventListener('readystatechange', () => {
        console.log('readyState', xhrSendForm.readyState);
        if (xhrSendForm.readyState === XMLHttpRequest.DONE && xhrSendForm.status === 200) {
           console.log('done');
        }
    });

    
    xhrSendForm.send(formData);
    elForm.reset();
});