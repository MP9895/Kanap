import { store, fetchData, get, has, price } from "./tools.js";

// Récupération du contenu du panier à partir du localstorage
let isCartEmpty = !has('basket');
if (isCartEmpty) {
    document.querySelector('h1').innerText = 'Votre panier est vide'
    document.querySelector('.cart').remove();
}
else {
    const allProducts = await fetchData("http://localhost:3000/api/products/")
    const products = buildCompleteList(allProducts)
    display(products);
    listenForProductDeletion(products);
    displayTotal(products);
    listenForQuantityChange(products);
}

function display(products) {
    products.forEach(product => { displayOne(product) })
}

function displayOne(product) {
    const div = document.createElement('div');
    document.querySelector('#cart__items').appendChild(div);
    div.innerHTML = `
        <article class="cart__item" data-id="${product._id}" data-color="${product.color}">
        <div class="cart__item__img">
        <img src="${product.imageUrl}" alt="${product.altText}">
        </div>
        <div class="cart__item__content">
        <div class="cart__item__content__description">
            <h2>${product.name}</h2>
            <p>${product.color}</p>
            <p>${price(product.price)}</p>
        </div>
        <div class="cart__item__content__settings">
            <div class="cart__item__content__settings__quantity">
            <p>Qté : </p>
            <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.qty}">
            </div>
            <div class="cart__item__content__settings__delete">
            <p class="deleteItem">Supprimer</p>
            </div>
        </div>
        </div>
    </article>`
}
   
function buildCompleteList(all) {
    const list = []
    const cart = get('basket');
    cart.forEach(productInCart => {
        const findProduct = all.find(a => a._id === productInCart.id)
        const item = {...findProduct};
        item.qty = productInCart.quantity
        item.color = productInCart.color
        list.push(item)
    })
    return list;
}

function listenForProductDeletion() {
    document.querySelectorAll('.deleteItem').forEach(button => {
        button.addEventListener('click', function(event) {
            let id = event.target.closest('article').getAttribute("data-id");
            let color = event.target.closest('article').getAttribute("data-color");

            let basket = get('basket');  
            basket = basket.filter(element => ! (element.id === id && element.color === color));
            store('basket', basket)

            alert('Vous avez bien supprimé votre produit du panier');
            window.location.reload();
        })
    })
}

function displayTotal(products) {
    let qty = 0
    let total = 0

    products.forEach(product => 
    {
        qty = qty + Number(product.qty)
        total = total + (Number(product.qty) * Number(product.price))
    })

    document.querySelector('#totalPrice').innerText = price(total)
    document.querySelector('#totalQuantity').innerText = qty
}

function listenForQuantityChange() {
    let inputs = document.querySelectorAll('.itemQuantity');

    inputs.forEach(input => {
        input.addEventListener('change', function(event) {

            const qty = event.target.valueAsNumber;
            if (qty <= 0 || qty > 100){
                alert("Veuillez choisir une quantité entre 1 et 100");
                return;
            }

            const id = event.target.closest('article').getAttribute("data-id");
            const color = event.target.closest('article').getAttribute("data-color");
            const products = get('basket');
            const product = products.find(p => p.id == id && p.color == color)
            product.quantity = qty;
            
            store('basket', products);
            window.location.reload();
        })
    });
}