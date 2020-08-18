const elSignInContainer = document.getElementById('signin')
const elSignInForm = document.getElementById('signin__form');
const elWelcomeMessage = document.getElementById('welcome');
const elWelcomeMessageUserIdText = document.getElementById('user_id');
const elLogoutButton = document.getElementById('btn-logout');

function setLoginState(id) {
    elWelcomeMessageUserIdText.innerText = id;
    localStorage.taskAutorizationUserId = id;
    elWelcomeMessage.classList.add('welcome_active');
    elLogoutButton.classList.add('btn-logout_active');
    elSignInContainer.classList.remove('signin_active');
}

function setLogoutState() {
    delete localStorage.taskAutorizationUserId;
    elLogoutButton.classList.remove('btn-logout_active');
    elWelcomeMessage.classList.remove('welcome_active');
    elSignInContainer.classList.add('signin_active');
}

function onStart() {
    const userid = localStorage.taskAutorizationUserId;
    if (userid) {
        setLoginState(userid);
    } else {
        setLogoutState();
    }
}

function loginAction(text) {
    const login = JSON.parse(text);    
    if (login.success) {
        setLoginState(login.user_id);
    } else {
        setTimeout(alert, 0, 'Неверный логин/пароль');
    }
}

elSignInForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const xhrSignIn = new XMLHttpRequest();
    xhrSignIn.open('POST', 'https://netology-slow-rest.herokuapp.com/auth.php');
    xhrSignIn.addEventListener('readystatechange', () => {
        if (xhrSignIn.readyState === 4 && xhrSignIn.status === 200) {
           loginAction(xhrSignIn.responseText);
        }
    });
    const formData = new FormData(elSignInForm);
    xhrSignIn.send(formData);
    elSignInForm.reset();
});

elLogoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    setLogoutState();
});

onStart();