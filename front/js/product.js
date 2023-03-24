import { fetchData, store, get, getFromUrl, has, price } from "./tools.js";

const id = getFromUrl('id');

fetchData("http://localhost:3000/api/products/" + id)
.then(function (product) {
    showProduct(product);
    listenForCartAddition(product)
})
.catch(e => {
    alert("Ce produit n'est plus disponible, vous allez être redirigés")
    location.href = 'index.html'
})

// Affichage du produit
function showProduct(product) {
    let Img = document.querySelector('.item__img');
    let H1 = document.querySelector('#title');
    let Price = document.querySelector('#price');
    let Description = document.querySelector('#description');
    let createImg = document.createElement('img');

    document.title = product.name;
    
    // Images
    createImg.setAttribute('src', product.imageUrl);
    createImg.setAttribute('alt', product.altTxt);
    Img.appendChild(createImg);

    // Noms
    H1.textContent = product.name;

    // Prix
    Price.textContent = price(product.price);

    // Choix
    Description.textContent = product.description;

    // insertion du tableau des couleurs dans une variable
    product.colors.forEach(color => {
        let option = document.createElement('option');
        option.setAttribute('value', color);
        option.textContent = color;
        document.querySelector('#colors').appendChild(option);
    })
}

function listenForCartAddition(product) {
    // écoute du click sur l'ajout au panier
    document.querySelector('#addToCart').addEventListener('click', function (event) {

        let color = document.querySelector('#colors').value;
        let quantity = document.querySelector('#quantity').value;
 
        // récupération des valeurs de quantité et de couleurs du produit choisi dans des variables
        if (quantity <= 0 || quantity > 100 || color == ""){
            alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé");
            return;
        }
        // récupération du contenu du panier (sans produit choisi de la page actuel)
        let basket = [];

        if (has('basket')) {
            basket = get('basket');
        }

        // creation du produit choisi
        let chosenProduct = {
            id: product._id,
            color: color,
            quantity: Number(quantity),
        }

        // ajout de la quantité du produit choisi à la quantité des produits dans le panier (SI ils ont le même id et même color)
        let boolean = false;
        for (let i = 0 ; i < basket.length; i++) {
            let basketProduct = basket[i];
            if (basketProduct.id == chosenProduct.id && basketProduct.color == chosenProduct.color) {
                let newQuantity = basketProduct.quantity + chosenProduct.quantity;
                if (newQuantity <= 0 || newQuantity > 100){
                    alert("Veuillez choisir une quantité entre 1 et 100");
                    return;
                }
                basketProduct.quantity = newQuantity;
                boolean = true;
                break;
            }
        } 

        // ajout du produit choisi dans le panier (SI ils ont pas le même id et même color)
        if (boolean == false) {
            basket.push(chosenProduct);
        }

        alert('Le produit ' + chosenProduct.quantity + ' ' + product.name + ' ' + chosenProduct.color + ' est bien ajoutée au panier !');
        store("basket", basket)
    });
}