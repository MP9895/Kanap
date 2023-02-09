// Récupération de l'id dans l'URL
var string = window.location.href;
var url = new URL(string);
var idURL = url.searchParams.get("id");

// Appel API avec l'id du produit
var productUnit = "";
var requestURL = "http://localhost:3000/api/products/" + idURL
fetch(requestURL)
.then(response => response.json())
.then(async function (resultatAPI) {
    productUnit = await resultatAPI;
    showProduct(productUnit);
})
.catch(error => {
    alert("Désole, le Kanap choisi n'existe plus");
    document.querySelector('main').remove();
    location.href = 'index.html'
});

// Affichage du produit
function showProduct(product) {
    let Img = document.querySelector('.item__img');
    let H1 = document.querySelector('#title');
    let Price = document.querySelector('#price');
    let Description = document.querySelector('#description');
    var createImg = document.createElement('img');

    document.title = product.name;
    
    // Images
    createImg.setAttribute('src', product.imageUrl);
    createImg.setAttribute('alt', product.altTxt);
    Img.appendChild(createImg);

    // Noms
    H1.textContent = product.name;

    // Prix
    Price.textContent = product.price;

    // Choix
    Description.textContent = product.description;

    // insertion du tableau des couleurs dans une variable
    product.colors.forEach(color => {
        var option = document.createElement('option');
        option.setAttribute('value', color);
        option.textContent = color;
        document.querySelector('#colors').appendChild(option);
    })
}


// Ajout au localstorage

// récupération de #colors, #quantity et #addToCard
let chosenColor = document.querySelector('#colors');
let chosenQuantity = document.querySelector('#quantity');
let sendToCart = document.querySelector('#addToCart');

// écoute du click sur l'ajout au panier
sendToCart.addEventListener('click', function (event) {
    // récupération des valeurs de quantité et de couleurs du produit choisi dans des variables
    let valueColor = chosenColor.value; 
    let valueQuantity = chosenQuantity.value;
    if (valueQuantity <= 0 || valueQuantity > 100 || valueColor == ""){
        alert("Veuillez choisir une quantité entre 1 et 100 et/ou une couleur de canapé");
    } else {
        // récupération du contenu du panier (sans produit choisi de la page actuel)
        let basketStr = localStorage.getItem('basket');
        if (basketStr == null) {
            var basket = {
                totalQuantity: 0,
                products: []
            }
        } else { 
            var basket = JSON.parse(basketStr)
        }

        // creation du produit choisi
        let chosenProduct = {
            id: productUnit._id,
            color: valueColor,
            quantity: Number(valueQuantity),
        }

        // ajout de la quantité du produit choisi à la quantité des produits dans le panier (SI ils ont le même id et même color)
        boolean = false;
        for (var i = 0 ; i < basket.products.length; i++) {
            basketProduct = basket.products[i];
            if (basketProduct.id == chosenProduct.id && basketProduct.color == chosenProduct.color) {
                newQuantity = basketProduct.quantity + chosenProduct.quantity;
                basketProduct.quantity = newQuantity;
                basket.totalQuantity = chosenProduct.quantity + basket.totalQuantity;
                boolean = true;
                break;
            }
        } 

        // ajout du produit choisi dans le panier (SI ils ont pas le même id et même color)
        if (boolean == false) {
            basket.products.push(chosenProduct);
            newQuantity = basket.totalQuantity + chosenProduct.quantity;
            basket.totalQuantity = newQuantity;
        }
        alert('Le produit ' + chosenProduct.quantity + ' ' + productUnit.name + ' ' + chosenProduct.color + ' est bien ajoutée au panier !');
        let lineBasket = JSON.stringify(basket);
        localStorage.setItem("basket", lineBasket);
        window.location.reload();
    }
});