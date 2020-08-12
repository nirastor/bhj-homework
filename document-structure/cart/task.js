const products = Array.from(document.querySelectorAll('.product'));
const elCart = document.querySelector('.cart');
const elCartProducts = document.querySelector('.cart__products');
const templateCart = document.getElementById('teplate-product-in-chart').content.querySelector('.cart__product');
let inChart = [];

function showCart() {
    if (inChart.length) {
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
        const ProdIsInChart = inChart.find(item => item.id === id);

        if (ProdIsInChart) {
            ProdIsInChart.quantity = Number(ProdIsInChart.quantity) + quantity;
            const productsInChart = Array.from(elCartProducts.querySelectorAll('.cart__product'));
            const product = productsInChart.find(item => item.dataset.id === id);
            product.querySelector('.cart__product-count').textContent = ProdIsInChart.quantity;
        } else {
            const newProdInChart = templateCart.cloneNode(1);
            const elChartProductCount = newProdInChart.querySelector('.cart__product-count');
            newProdInChart.dataset.id = id;
            newProdInChart.querySelector('.cart__product-image').src = product.querySelector('.product__image').src;
            elChartProductCount.textContent = quantity;
            elCartProducts.appendChild(newProdInChart);
            inChart.push({id: id, quantity: quantity});

            const elDeleteProduct = newProdInChart.querySelector('.cart__remove');
            elDeleteProduct.addEventListener('click', (e) => {
                e.preventDefault();
                newProdInChart.remove();
                const delId = elDeleteProduct.closest('.cart__product').dataset.id;
                const indexInCartForDel = inChart.findIndex(item => item.id === id);
                inChart.splice(indexInCartForDel, 1);
                showCart();
            })
        }

        showCart();
    });
});

showCart();