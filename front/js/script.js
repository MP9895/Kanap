var Kanap = "";
var requestURL = "http://localhost:3000/api/products/"
fetch(requestURL)
.then(response => response.json())
.then(async function (resultatAPI) {
    Kanap = await resultatAPI;
    showProducts(Kanap);
})
.catch(error => alert("Erreur : " + error));

// Affichage des produits
function showProducts(products) {
    for (var i = 0; i < products.length; i++){
        var product = products[i];
        let elements = document.querySelector('.items');

        // insertion du lien de chaque canapés
        var element = document.createElement('a');
        element.setAttribute('href', "./product.html?id=" + product._id);
        elements.appendChild(element);

        // insertion des articles
        var createArticle = document.createElement('article');
        element.appendChild(createArticle);

        // insertion des images
        var createImg = document.createElement('img');
        createImg.setAttribute('src', product.imageUrl);
        createImg.setAttribute('alt', product.altTxt);
        createArticle.appendChild(createImg);
    
        // insertion des noms dans h3
        var createTitle = document.createElement('h3');
        createTitle.className = 'productName';
        createTitle.textContent = product.name;
        createArticle.appendChild(createTitle);

        // insertion des descriptions dans p
        var createP = document.createElement('p');
        createP.className = 'productDescription';
        createP.textContent = product.description;
        createArticle.appendChild(createP);
    }
}