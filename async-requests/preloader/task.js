const elItems = document.getElementById('items');
const elLoader = document.getElementById('loader');


function showCurrency(respText) {
    const currencyList = JSON.parse(respText).response.Valute;
    currencyHTML = '';
    for (let val in currencyList) {
        currencyHTML += `
        <div class="item">
            <div class="item__code">${currencyList[val].CharCode}</div>
            <div class="item__value">${currencyList[val].Value}</div>
            <div class="item__currency">руб.</div>
        </div>`
    }
    elItems.innerHTML = currencyHTML;
}

function loadFromLocalStorage() {
    const savedCurrency = localStorage.currencyPreloader;
    if (savedCurrency) {
        showCurrency(savedCurrency);
    }
}

function loadCurrency() {
    elLoader.classList.add('loader_active');
    loadFromLocalStorage();

    const xhrGetCurrency = new XMLHttpRequest();
    xhrGetCurrency.open('GET', 'https://netology-slow-rest.herokuapp.com');
    
    xhrGetCurrency.addEventListener('readystatechange', () => {
        if (xhrGetCurrency.readyState === XMLHttpRequest.DONE && xhrGetCurrency.status === 200) {
            localStorage.currencyPreloader = xhrGetCurrency.responseText;
            showCurrency(xhrGetCurrency.responseText);
            elLoader.classList.remove('loader_active');
        }
    });
    
    xhrGetCurrency.send();
}

loadCurrency();