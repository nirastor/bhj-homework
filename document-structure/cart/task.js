const products = Array.from(document.querySelectorAll('.product'));
const elCart = document.querySelector('.cart');
const elCartProducts = document.querySelector('.cart__products');
const templateCart = document.getElementById('teplate-product-in-chart').content.querySelector('.cart__product');
let inCart = [];

function loadCartFromLocalStorage() {
    for (let i = 1; i <= 4; i++) {
        if (localStorage.getItem(i)) {
            showNewProductInCart(i, localStorage.getItem(i), products[i-1]);
        }
    }
}

function showNewProductInCart(id, quantity, product) {
    const newProdInCart = templateCart.cloneNode(1);
    const elChartProductCount = newProdInCart.querySelector('.cart__product-count');
    newProdInCart.dataset.id = id;
    newProdInCart.querySelector('.cart__product-image').src = product.querySelector('.product__image').src;
    elChartProductCount.textContent = quantity;
    elCartProducts.appendChild(newProdInCart);
    inCart.push({id: id, quantity: quantity});
    
    const elDeleteProduct = newProdInCart.querySelector('.cart__remove');
    elDeleteProduct.addEventListener('click', (e) => {
        e.preventDefault();
        newProdInCart.remove();
        const delId = elDeleteProduct.closest('.cart__product').dataset.id;
        const indexInCartForDel = inCart.findIndex(item => item.id === id);
        inCart.splice(indexInCartForDel, 1);
        localStorage.removeItem(id);
        showCart();
    })
}

function showCart() {
    if (inCart.length) {
        elCart.classList.remove('cart--hide');
    } else {
        elCart.classList.add('cart--hide');
    }
}

products.forEach(product => {
    const elProdDecButton = product.querySelector('.product__quantity-control_dec');
    const elProdIncButton = product.querySelector('.product__quantity-control_inc');
    const elProdAddButton = product.querySelector('.product__add');
    const elProdValue = product.querySelector('.product__quantity-value');

    elProdIncButton.addEventListener('click', (e) => {
        e.preventDefault();
        elProdValue.textContent = Number(elProdValue.textContent.trim()) + 1;
    });

    elProdDecButton.addEventListener('click', (e) => {
        e.preventDefault();
        let quantity = Number(elProdValue.textContent.trim());
        if (quantity > 1) {
            elProdValue.textContent = quantity - 1;
        }
    });

    elProdAddButton.addEventListener('click', (e) => {
        e.preventDefault();
        const id = product.dataset.id;
        const quantity = Number(elProdValue.textContent.trim());
        const ProdIsInCart = inCart.find(item => item.id === id);

        if (ProdIsInCart) {
            ProdIsInCart.quantity = Number(ProdIsInCart.quantity) + quantity;
            localStorage.setItem(id, Number(ProdIsInCart.quantity));
            const productsInCart = Array.from(elCartProducts.querySelectorAll('.cart__product'));
            const product = productsInCart.find(item => item.dataset.id === id);
            product.querySelector('.cart__product-count').textContent = ProdIsInCart.quantity;
        } else {
            showNewProductInCart(id, quantity, product);
            localStorage.setItem(id, quantity);
        }

        showCart();
    });
});

loadCartFromLocalStorage();
showCart();