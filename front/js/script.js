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
function showProducts(productsSheet) {
    for (var i = 0; i < productsSheet.length; i++){
        var product = productsSheet[i];
        let allPanels = document.querySelector('.items');

        // insertion du lien de chaque canapés
        var createLinkPanel = document.createElement('a');
        createLinkPanel.setAttribute('href', "./product.html?id=" + product._id);
        allPanels.appendChild(createLinkPanel);

        // insertion des articles
        var createArticle = document.createElement('article');
        createLinkPanel.appendChild(createArticle);

        // insertion des images
        var createPict = document.createElement('img');
        createPict.setAttribute('src', product.imageUrl);
        createPict.setAttribute('alt', product.altTxt);
        createArticle.appendChild(createPict);
    
        // insertion des noms dans h3
        var createH3 = document.createElement('h3');
        createH3.className = 'productName';
        createH3.textContent = product.name;
        createArticle.appendChild(createH3);

        // insertion des descriptions dans p
        var createP = document.createElement('p');
        createP.className = 'productDescription';
        createP.textContent = product.description;
        createArticle.appendChild(createP);
    }
}