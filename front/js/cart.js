import { store, fetchData } from "./tools.js";

// Récupération du contenu du panier à partir du localstorage
let isCartEmpty = !localStorage.getItem('basket');
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

    // Display Total
    // Listen for quantity change

// Affichage des produits dans la page panier (avec les prix en fetch)
function display(products) {
    products.forEach(product => { displayOne(product) })
}

function displayOne(product) {
    // AFFICHAGE DU/DES PRODUIT(S) PANIER

    // insertion des articles
    const createArticle = document.createElement('article');
    createArticle.className = 'cart__item';
    createArticle.setAttribute('data-id', product._id);
    createArticle.setAttribute('data-color', product.color);
    document.querySelector('#cart__items').appendChild(createArticle);

    // insertion div de l'img
    const createDivIMG = document.createElement('div');
    createDivIMG.className = 'cart__item__img';
    createArticle.appendChild(createDivIMG);

    // insertion des images
    const createIMG = document.createElement('img');
    createIMG.setAttribute('src', product.imageUrl);
    createIMG.setAttribute('alt', "Photographie d'un canapé");
    createDivIMG.appendChild(createIMG);

    // insertion div content description
    const createDivContDes = document.createElement('div');
    createDivContDes.className = 'cart__item__content';
    createArticle.appendChild(createDivContDes);

    // insertion div description
    const createDivDes = document.createElement('div');
    createDivDes.className = 'cart__item__content__description';
    createDivContDes.appendChild(createDivDes);

    // insertion H2
    const createH2 = document.createElement('h2');
    createH2.textContent = product.name;
    createDivDes.appendChild(createH2);

    // insertion P color
    const createpColor = document.createElement('p');
    createpColor.textContent = "Couleur : " + product.color;
    createDivDes.appendChild(createpColor);

    // insertion delete button
    const deleteButton = document.createElement('span');
    createpColor.textContent = "Supprimer";
    createpColor.classList.add('deleteItem')
    createDivDes.appendChild(deleteButton);

    // insertion change quantity
    // const changeQuantityButton = document.createElement('span');
    // createpColor.textContent = "Changer la quantité";
    // createpColor.classList.add('changeQuantity')
    // createDivDes.appendChild(changeQuantityButton);
}
   
function buildCompleteList(all) {
    const list = []
    const cart = JSON.parse(localStorage.getItem('basket'));
    cart.forEach(productInCart => {
        const findProduct = all.find(a => a._id = productInCart.id)
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

            let basket = JSON.parse(localStorage.getItem('basket'));  
            basket = basket.filter(element => element.id !== id && element.color !== color);
            store('basket', basket)

            alert('Vous avez bien supprimé votre produit du panier');
            window.location.reload();
        })
    })
}

function displayTotal() {
    let price = 2500
    let qty = 5

    document.querySelector('#totalPrice').innerText = price
    document.querySelector('#totalQuantity').innerText = qty
}

function listenForQuantityChange() {

}
