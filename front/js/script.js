var Kanap = "";
var requestURL = "http://localhost:3000/api/products/"
fetch(requestURL)
.then(response => response.json())
.then(function (resultatAPI) {
    Kanap = resultatAPI;
    showProducts(Kanap);
})
.catch(error => alert("Erreur : " + error));

// Affichage des produits
function showProducts(products) {
    for (var i = 0; i < products.length; i++){
        var product = products[i];
        let elements = document.querySelector('.items');

        // Lien de chaque canapés
        var element = document.createElement('a');
        element.setAttribute('href', "./product.html?id=" + product._id);
        elements.appendChild(element);

        // Articles
        var createArticle = document.createElement('article');
        element.appendChild(createArticle);

        // Images
        var createImg = document.createElement('img');
        createImg.setAttribute('src', product.imageUrl);
        createImg.setAttribute('alt', product.altTxt);
        createArticle.appendChild(createImg);
    
        // Noms
        var createTitle = document.createElement('h3');
        createTitle.className = 'productName';
        createTitle.textContent = product.name;
        createArticle.appendChild(createTitle);

        // Descriptions
        var createP = document.createElement('p');
        createP.className = 'productDescription';
        createP.textContent = product.description;
        createArticle.appendChild(createP);
    }
}