import { fetchData } from "./tools.js";

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
    let createArticle = document.createElement('article');
    createArticle.className = 'cart__item';
    createArticle.setAttribute('data-id', product.id);
    createArticle.setAttribute('data-color', product.color);
    document.querySelector('#cart__items').appendChild(createArticle);

    // insertion div de l'img
    letcreateDivIMG = document.createElement('div');
    createDivIMG.className = 'cart__item__img';
    createArticle.appendChild(createDivIMG);

    // insertion des images
    letcreateIMG = document.createElement('img');
    createIMG.setAttribute('src', product.imageUrl);
    createIMG.setAttribute('alt', "Photographie d'un canapé");
    createDivIMG.appendChild(createIMG);

    // insertion div content description
    letcreateDivContDes = document.createElement('div');
    createDivContDes.className = 'cart__item__content';
    createArticle.appendChild(createDivContDes);

    // insertion div description
    let createDivDes = document.createElement('div');
    createDivDes.className = 'cart__item__content__description';
    createDivContDes.appendChild(createDivDes);

    // insertion H2
    let createH2 = document.createElement('h2');
    createH2.textContent = product.name;
    createDivDes.appendChild(createH2);

    // insertion P color
    let createpColor = document.createElement('p');
    createpColor.textContent = "Couleur : " + product.color;
    createDivDes.appendChild(createpColor);
}
   
function buildCompleteList(all) {
    const list = []
    const cart = JSON.parse(localStorage.getItem('products'));
    cart.forEach(productInCart => {
        const findProduct = all.find(a => a._id = productInCart.id)
        const item = {...findProduct};
        item.qty = productInCart.quantity
        item.color = productInCart.color
        list.push(item)
    })

    return list;
}

// Suppression d'un prduit dans le panier
function deleteProduct() {
    let deleteItem = document.querySelectorAll('.deleteItem');
    for (let i = 0; i < delItem.length; i++) {
        deleteItemUnit = deleteItem[i];
        deleteItemUnit.addEventListener('click', function(event) {
            let articleDeleteItemID = event.target.closest('article').getAttribute("data-id");
            let articleDeleteItemColor = event.target.closest('article').getAttribute("data-color");
            
            var basket = JSON.parse(basketStr);   
            productToDelete = basket.products.find(element => element.id == articleDeleteItemID && element.color == articleDeleteItemColor);
            
            result = basket.products.filter(element => element.id !== articleDeleteItemID || element.color !== articleDeleteItemColor);
            basket.products = result;

            newQuantity = basket.totalQuantity - productToDelete.quantity;
            basket.totalQuantity = newQuantity;
            priceToDelete = productToDelete.quantity * productToDelete.price;
            alert('Vous avez bien supprimé votre produit du panier');
        })
    };
}
