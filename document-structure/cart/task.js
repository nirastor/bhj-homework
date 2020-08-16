const products = Array.from(document.querySelectorAll('.product'));
const elCart = document.querySelector('.cart');
const elCartProducts = document.querySelector('.cart__products');
let productsDb;

function saveCart() {
    localStorage.taskFishCart = JSON.stringify(productsDb);
} 

function getSavedCart() {
    try {
        return JSON.parse(localStorage.getItem('taskFishCart'));
    } catch (e) {
        return null;
    }
}

// Лучше сравнивать что пришло из хранилища, а что нашлось в html
// но для этой задачи такой реализации достаточно
function setProductsDb() {
    productsDb = getSavedCart();
    
    if (!productsDb) {
        productsDb = [];
        products.forEach(product => {
            const id = Number(product.dataset.id);
            const productImageSrc =  product.querySelector('.product__image').src;
            productsDb.push({id: id, inCart: 0, src: productImageSrc});
        });
    }

    console.log(productsDb);
}

function renderСhart() {
    let productsInCart = '';

    for (let product of productsDb) {
        if (product.inCart !== 0) {
            productsInCart += `
            <div class="cart__product" data-id="${product.id}">
                <img class="cart__product-image" src="${product.src}">
                <div class="cart__product-count">${product.inCart}</div>
                <div class="cart__remove">&times;</div>
            </div>`;
        }
    }
    
    elCartProducts.innerHTML = productsInCart;

    const elRemoves = Array.from(elCartProducts.querySelectorAll('.cart__remove'));
    elRemoves.forEach(elRemove => {
        elRemove.addEventListener('click', (e) => {
            e.preventDefault();
            removeFromCart( Number(elRemove.closest('.cart__product').dataset.id) );
        });
    });

    if (productsInCart) {
        elCart.classList.remove('cart--hide');
    } else {
        elCart.classList.add('cart--hide');
    }
}

function getIndexById(id) {
    return productsDb.findIndex(item => item.id == id);
}

function removeFromCart(id) {
    productsDb[getIndexById(id)].inCart = 0;
    saveCart();
    renderСhart();
}

function addToCart(id, quantity) {
    productsDb[getIndexById(id)].inCart += quantity;
    saveCart();
    renderСhart();
}

products.forEach(product => {
    const elProdDecButton = product.querySelector('.product__quantity-control_dec');
    const elProdIncButton = product.querySelector('.product__quantity-control_inc');
    const elProdAddButton = product.querySelector('.product__add');
    const elProdValue = product.querySelector('.product__quantity-value');
    const id = Number(product.dataset.id);
    
    elProdIncButton.addEventListener('click', (e) => {
        e.preventDefault();
        elProdValue.textContent = Number(elProdValue.textContent.trim()) + 1;
    });

    elProdDecButton.addEventListener('click', (e) => {
        e.preventDefault();
        const quantity = Number(elProdValue.textContent.trim());
        if (quantity > 1) {
            elProdValue.textContent = quantity - 1;
        }
    });

    elProdAddButton.addEventListener('click', (e) => {
        e.preventDefault();
        const quantity = Number(elProdValue.textContent.trim());
        // console.log(`add button for ${id}. quantity ${quantity}`);
        addToCart(id, quantity);
    });
});

setProductsDb();
renderСhart();