// Récupération du contenu du panier à partir du localstorage
let basketStr = localStorage.getItem('basket');
var basket = JSON.parse(basketStr);

// Récupération de l'élement "cart__items"
var cartPanel = document.querySelector('#cart__items');

// Affichage des produits dans la page panier (avec les prix en fetch)
function showProductBasket(produit) {
    // AFFICHAGE DU/DES PRODUIT(S) PANIER
    // insertion des articles
    var createArticle = document.createElement('article');
    createArticle.className = 'cart__item';
    createArticle.setAttribute('data-id', produit.id);
    createArticle.setAttribute('data-color', produit.color);
    cartPanel.appendChild(createArticle);

    // insertion div de l'img
    var createDivIMG = document.createElement('div');
    createDivIMG.className = 'cart__item__img';
    createArticle.appendChild(createDivIMG);

    // insertion des images
    var createPict = document.createElement('img');
    createPict.setAttribute('src', produit.img);
    createPict.setAttribute('alt', "Photographie d'un canapé");
    createDivIMG.appendChild(createPict);

    // insertion div content description
    var createDivContDes = document.createElement('div');
    createDivContDes.className = 'cart__item__content';
    createArticle.appendChild(createDivContDes);

    // insertion div description
    var createDivDes = document.createElement('div');
    createDivDes.className = 'cart__item__content__description';
    createDivContDes.appendChild(createDivDes);

    // insertion H2
    var createH2 = document.createElement('h2');
    createH2.textContent = produit.name;
    createDivDes.appendChild(createH2);

    // insertion P color
    var createpColor = document.createElement('p');
    createpColor.textContent = "Couleur : " + produit.color;
    createDivDes.appendChild(createpColor);

    // recupération du prix en utilisant l'id du produit
    var productUnit = "";
    fetch("http://localhost:3000/api/products/" + produit.id)
    .then(response => response.json())
    .then(async function (resultatAPI) {
        productUnit = await resultatAPI;
        // insertion P price
        var createpPrice = document.createElement('p');
        createpPrice.textContent = "Prix : " + productUnit.price + " € / canapé";
        createDivDes.appendChild(createpPrice);
    })
    .catch(error => alert("Erreur : " + error));
}
   
// Si le panier est vide, afficher "panier vide", sinon récuperer le panier

async function showCart() {
    if (basketStr == null) {
        var createpEmpty = document.createElement('p');
        createpEmpty.textContent = 'Votre panier est vide';
        cartPanel.appendChild(createpEmpty);
    } else {   
        var totalPrice = 0;
        for (var i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i];
            showProductBasket(basketProduct);
            var productsPrice = await getProduct(basketProduct.id);
            var productQuantity = basketProduct.quantity;
            totalPrice += productsPrice.price * productQuantity;
            let totalPriceElt = document.querySelector('#totalPrice');
            totalPriceElt.textContent = totalPrice;
        }
        let totalQuantity = document.querySelector('#totalQuantity');
        totalQuantity.textContent = basket.totalQuantity;
        changeQuantity()
        deleteProduct()
    }
}
showCart();





